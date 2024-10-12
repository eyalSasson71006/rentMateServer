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

module.exports = { deleteUserChats };