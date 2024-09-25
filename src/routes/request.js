
const express = require('express');
const { userAuth } = require('../middlewares/auth');
const connectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
const requestRouter = express.Router();

requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const ALLOWED_STATUS = ['intrested','ignored'];

        if (!ALLOWED_STATUS.includes(status)){
            throw new Error('Invalid status');
        }

        const isToUserExists = await User.findById(toUserId);

        if (!isToUserExists){
            throw new Error('user not found!');
        }

        const isConnectionRequestExist = await connectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId}
            ]
        });

        if (isConnectionRequestExist) {
            return res.status(404).json({ message: 'connection request already exist!'});
        }
        const request = await connectionRequest({
            fromUserId,
            toUserId,
            status
        });

        await request.save();
        res.json({message: `connection request ${status}`});

    } catch (err) {
        res.status(400).send('ERROR: ' + err.message);
    }
})

module.exports = requestRouter;