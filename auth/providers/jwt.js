const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_WORD = process.env.JWT_SECRET;

const generateAuthToken = (user) => {
    return jwt.sign({
        _id: user._id,
        isOwner: user.isOwner,
        isAdmin: user.isAdmin,
    }, SECRET_WORD);
};

const verifyToken = (tokenFromClient) => {
    try {
        return jwt.verify(tokenFromClient, SECRET_WORD);
    } catch (error) {
        return null;
    }
};

module.exports = { generateAuthToken, verifyToken };