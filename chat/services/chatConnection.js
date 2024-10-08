const Chat = require("../models/Chat");

const socketConnection = (socket, io) => {
    console.log(`User connected: ${socket.user._id}`);

    // Join all chat rooms the user is part of
    // Fetch chats from the database where user is a participant
    Chat.find({ participants: socket.user._id })
        .then((chats) => {
            chats.forEach((chat) => {
                socket.join(chat._id.toString());
            });
            ;
            return chats;
        }).then(chats => socket.emit('chatsList', chats))
        .catch((err) => console.error(err));


    // Handle sending messages
    socket.on('sendMessage', async ({ chatId, content }) => {
        try {
            const chat = await Chat.findById(chatId);
            if (!chat) return;

            // Verify that the sender is part of the chat
            if (!chat.participants.includes(socket.user._id)) return;

            const message = {
                sender: socket.user._id,
                content,
                timestamp: new Date(),
            };
            chat.messages.push(message);
            await chat.save();

            // Emit the message to all participants in the chat room
            io.to(chatId).emit('receiveMessage', {
                chatId,
                message
            });
        } catch (err) {
            console.error(err);
        }
    });

    // Handle creating a new chat
    socket.on('createChat', async ({ recipientId }) => {
        try {
            // Check if a chat already exists between the two users
            let chat = await Chat.findOne({
                participants: { $all: [socket.user._id, recipientId] },
            });

            if (!chat) {
                chat = new Chat({
                    participants: [socket.user._id, recipientId],
                    messages: [],
                });
                await chat.save();
            }

            socket.emit('enterChat', { chatId: chat._id });
            // Join the chat room
            socket.join(chat._id.toString());
        } catch (err) {
            console.error(err);
        }
    });

    socket.on('selectChat', async (chatId) => {
        try {
            const chat = await Chat.findById(chatId);
            if (!chat) return;

            // Update the user's lastSeen timestamp in the chat
            const userId = socket.user._id;
            const userLastSeen = chat.lastSeen.find(
                (seen) => seen.userId.toString() === userId.toString()
            );
            if (userLastSeen) {
                userLastSeen.lastSeenAt = new Date();
            } else {
                chat.lastSeen.push({ userId, lastSeenAt: new Date() });
            }
            await chat.save();
        } catch (err) {
            console.error(err);
        }
    });

    socket.on('getChatsWithUnreadCount', async () => {
        try {
            const userId = socket.user._id;
            const chats = await Chat.find({ participants: userId });

            const chatsWithUnreadCount = chats.map((chat) => {
                const userLastSeen = chat.lastSeen.find(
                    (seen) => seen.userId.toString() === userId.toString()
                );
                const lastSeenAt = userLastSeen ? userLastSeen.lastSeenAt : new Date(0);

                const unreadMessages = chat.messages.filter(
                    (message) => message.timestamp > lastSeenAt && message.sender.toString() !== userId.toString()
                );

                return {
                    ...chat.toObject(),
                    unreadCount: unreadMessages.length,
                };
            });

            socket.emit('chatsList', chatsWithUnreadCount);
        } catch (err) {
            console.error(err);
        }
    });

    socket.on('markMessagesAsRead', async (chatId) => {
        try {
            const chat = await Chat.findById(chatId);
            if (!chat) return;

            // Mark all unread messages from other users as read
            chat.messages.forEach((message) => {
                if (message.sender.toString() !== socket.user._id.toString() && !message.isRead) {
                    message.isRead = true;
                }
            });

            await chat.save();
        } catch (err) {
            console.error(err);
        }
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.user._id}`);
    });
};


module.exports = socketConnection;