const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const userRouter = express.Router();

userRouter.get('/user/connections/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connections = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: 'interested'
        }).populate('fromUserId', "firstName lastName age gender skills photoUrl");

        res.json({ message: "data fetched successfully", data: connections});
    } catch(err) {
        res.status(400).send('ERROR: ' + err.message);
    }
})

module.exports = userRouter;