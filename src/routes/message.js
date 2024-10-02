
const express = require('express');
const { userAuth } = require('../middlewares/auth');
const Message = require('../models/message');
const messageRouter = express.Router();

messageRouter.get('/messages/:toUserId', userAuth, async (req, res) => {
    try {
        const toUserId = req.params.toUserId;
        const loggedInUserId = req.user._id.toString();
        const messages = await Message.find({
            $or: [
                { fromUserId: loggedInUserId, toUserId: toUserId, status: "sent"}, 
                { fromUserId: toUserId, toUserId: loggedInUserId, status: "sent"}
            ]
        });
        if(!messages || messages.length === 0) {
            return res.send("No messages found");
        }
        const unreadMessages = messages.filter((message) => {
            if(message.toUserId.toString() === loggedInUserId){
                return message;
            }
        });

        if(unreadMessages.length>0){
            const messageIds = unreadMessages.map((message) => message._id);

            await Message.updateMany({ _id : { $in: messageIds}}, { $set:  { status: 'read' }});

            unreadMessages.forEach(message => message.status = 'read');
        }


        res.send({message: 'user messages retrived', data: unreadMessages});

    } catch(err) {
        res.status(400).send('ERROR: ' + err.message);
    }
});

messageRouter.post('/message/send/:status/:toUserId', userAuth, async (req, res) => {
    try {
        const { message } = req.body;
        const fromUserId = req.user._id;
        const status = req.params.status;
        const toUserId = req.params.toUserId;
        const data = await Message({ fromUserId, toUserId, status, message});
        await data.save();

        res.send({ message: "message sent successfully", data: data});
    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = messageRouter;