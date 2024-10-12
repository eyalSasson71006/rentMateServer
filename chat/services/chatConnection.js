const { getUserChats, getChatById, createChat } = require("../models/chatAccessDataService");
const userSocketMap = require("../models/userSocketMap");

const socketConnection = (socket, io) => {
    console.log(`User connected: ${socket.user._id}`);

    userSocketMap[socket.user._id] = socket.id;
    getUserChats(socket.user._id)
        .then((chats) => {
            chats.forEach((chat) => {
                socket.join(chat._id.toString());
            });
            ;
            return chats;
        }).then(chats => socket.emit('chatsList', chats))
        .catch((err) => console.error(err));


    socket.on('sendMessage', async ({ chatId, content }) => {
        try {
            const chat = await getChatById(chatId);
            if (!chat) return;

            if (!chat.participants.includes(socket.user._id)) return;

            const message = {
                sender: socket.user._id,
                content,
                timestamp: new Date(),
            };
            chat.messages.push(message);
            await chat.save();

            io.to(chatId).emit('receiveMessage', {
                chatId,
                message
            });
        } catch (err) {
            console.error(err);
        }
    });

    socket.on('createChat', async ({ recipientId }) => {
        try {
            let chat = await createChat(socket.user._id, recipientId);

            socket.emit('enterChat', { chatId: chat._id });
            socket.join(chat._id.toString());

            const recipientSocketId = userSocketMap[recipientId];
            if (recipientSocketId) {
                const recipientSocket = io.sockets.sockets.get(recipientSocketId);
                if (recipientSocket) {
                    recipientSocket.join(chat._id.toString());
                }
            }

        } catch (err) {
            console.error(err);
        }
    });

    socket.on('markMessagesAsRead', async (chatId) => {
        try {
            const chat = await getChatById(chatId);
            if (!chat) return;

            chat.messages.forEach((message) => {
                if (message.sender.toString() !== socket.user._id.toString() && !message.isRead) {
                    message.isRead = true;
                }
            });

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
            const chats = await getUserChats(userId);

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


    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.user._id}`);
    });
};


module.exports = socketConnection;