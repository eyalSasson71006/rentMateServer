const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    isRead: {
        type: Boolean,
        default: false
    }
});

const chatSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
    ],
    messages: [messageSchema],
    lastSeen: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        lastSeenAt: { type: Date, default: null }
    }]
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;