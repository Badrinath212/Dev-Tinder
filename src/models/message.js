
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: [ 'sent', 'read', 'delivered'],
            message: '{VALUE} is not valid status'
        }
    }
}, {timestamps: true});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;