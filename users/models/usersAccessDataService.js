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
            let user = await User.find();
            return user;
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
            return user;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

module.exports = { registerUser, getUsers, getUserById, loginUser, updateUser };