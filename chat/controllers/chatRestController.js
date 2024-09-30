const express = require('express');
const Chat = require('../models/Chat');
const ioAuth = require('../../auth/socketAuthService');
const auth = require('../../auth/authService');

const router = express.Router();
// Get chat by ID
router.get('/:chatId', auth, async (req, res) => {
    try {
        const { chatId } = req.params;
        const userInfo = req.user;
        const userId = userInfo._id;
        const chat = await Chat.findById(chatId).populate('messages.sender', 'username');
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // Check if the user is a participant
        if (!chat.participants.includes(userId)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json({ messages: chat.messages });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
