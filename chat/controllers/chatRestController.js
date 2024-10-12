const express = require('express');
const Chat = require('../models/Chat');
const auth = require('../../auth/authService');
const { getChatById } = require('../models/chatAccessDataService');

const router = express.Router();

router.get('/:chatId', auth, async (req, res) => {
    try {
        const { chatId } = req.params;
        const userInfo = req.user;
        const userId = userInfo._id;
        const chat = await getChatById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        if (!chat.participants.includes(userId)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json({ messages: chat.messages, participants: chat.participants });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
