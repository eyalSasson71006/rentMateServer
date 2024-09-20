const { generateAuthToken } = require("../../auth/providers/jwt");
const { createError } = require("../../utils/handleErrors");
const { generateUserPassword, comparePasswords } = require("../helpers/bcrypt");
const User = require("./user");
const _ = require("lodash");


const registerUser = async (newUser) => {
    try {
        newUser.password = generateUserPassword(newUser.password);
        let user = new User(newUser);
        user = await user.save();
        user = _.pick(user, ["email", "name", "_id"]);
        return (user);
    } catch (error) {
        createError("Mongoose ", error)
    }
}

const loginUser = async (email, password) => {
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
};

const getUserById = async (userId) => {
    try {
        let user = await User.findById(userId);
        return user;
    } catch (error) {
        createError("Mongoose ", error);
    }
};

const getUsers = async () => {
    try {
        let user = await User.find();
        return user;
    } catch (error) {
        createError("Mongoose ", error);
    }
};

const updateUser = async (userId, updatedUser) => {
    try {
        let user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
        return user;
    } catch (error) {
        createError("Mongoose ", error);
    }
};

module.exports = { registerUser, getUsers, getUserById, loginUser, updateUser };