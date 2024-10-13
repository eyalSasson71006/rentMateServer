const { generateAuthToken } = require("../../auth/providers/jwt");
const { createError } = require("../../utils/handleErrors");
const { generateUserPassword, comparePasswords } = require("../helpers/bcrypt");
const User = require("./user");
const _ = require("lodash");
const config = require("config");

const DB = config.get("DB");


const registerUser = async (newUser) => {
    if (DB === "mongodb") {
        try {
            newUser.password = generateUserPassword(newUser.password);
            let user = new User(newUser);
            user = await user.save();
            user = _.pick(user, ["email", "name", "_id"]);
            return (user);
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const loginUser = async (email, password) => {
    if (DB === "mongodb") {
        try {
            const user = await User.findOne({ email: email });
            if (!user || !comparePasswords(password, user.password)) {
                const error = new Error("Invalid email or password");
                return createError("Authentication", error, 401);
            }
            return generateAuthToken(user);
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const getUserById = async (userId) => {
    if (DB === "mongodb") {
        try {
            let user = await User.findById(userId);
            user = _.pick(user, ["_id", "name", "email", "phone", "image", "address", "rating", "isOwner", "isAdmin"]);
            return user;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const getUsers = async () => {
    if (DB === "mongodb") {
        try {
            let users = await User.find();
            users = users.map(user => _.pick(user, ["_id", "name", "email", "phone", "image", "isOwner", "isAdmin"]));
            return users;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const updateUser = async (userId, updatedUser) => {
    if (DB === "mongodb") {
        try {
            let user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
            user = _.pick(user, ["_id", "name", "email", "phone", "image", "address", "rating", "isOwner", "isAdmin"]);
            return user;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const deleteUser = async (userId) => {
    if (DB === "mongodb") {
        try {
            let user = await User.findByIdAndDelete(userId);
            user = _.pick(user, ["_id", "name", "email", "phone", "image", "address", "rating", "isOwner", "isAdmin"]);
            return user;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const toggleIsOwner = async (userId) => {
    if (DB === "mongodb") {
        try {
            let user = await User.findById(userId);
            user.isOwner = !user.isOwner;
            await user.save();
            user = _.pick(user, ["_id", "name", "email", "phone", "image", "address", "rating", "isOwner", "isAdmin"]);
            return user;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }

    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

module.exports = { registerUser, getUsers, getUserById, loginUser, updateUser, deleteUser, toggleIsOwner };