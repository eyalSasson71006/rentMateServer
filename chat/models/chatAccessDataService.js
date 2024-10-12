const config = require("config");
const Chat = require("./Chat");

const DB = config.get("DB");

const deleteUserChats = async (id) => {
    if (DB === "mongodb") {
        try {
            let chats = await Chat.deleteMany({ participants: id });
            return chats;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};


const getChatById = async (id) => {
    if (DB === "mongodb") {
        try {
            let chat = await Chat.findById(id)
            return chat;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const getUserChats = async (id) => {
    if (DB === "mongodb") {
        try {
            let chats = await Chat.find({ participants: id })
            return chats;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const createChat = async (userId, recipientId) => {
    if (DB === "mongodb") {
        try {
            let chat = await Chat.findOne({
                participants: { $all: [userId, recipientId] },
            });

            if (!chat) {
                chat = new Chat({
                    participants: [userId, recipientId],
                    messages: [],
                });
                await chat.save();
            }
            return chat;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};



module.exports = { deleteUserChats, getChatById, getUserChats, createChat };