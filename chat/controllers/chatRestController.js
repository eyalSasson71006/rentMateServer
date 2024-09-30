const express = require('express');
const Chat = require('../models/Chat');
const auth = require('../../auth/authService');

const router = express.Router();

router.get('/my-chats', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const userId = userInfo._id;        
        const chats = await Chat.find({ participants: userId })
        
        if (!chats) {
            return res.status(404).json({ message: 'Chats not found' });
        }
        res.json(chats || []);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

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
