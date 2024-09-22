const registerValidation = require("./joi/registerValidation");
const loginValidation = require("./Joi/loginValidation");
const editUserValidation = require("./joi/editUserValidation");

const config = require("config");

const VALIDATOR = config.get("VALIDATOR");

const validateRegistration = (user) => {
    if (VALIDATOR === "joi") {
        const { error } = registerValidation(user);
        if (error) return error.details[0].message;
        return "";
    }
};

const validateEditUser = (user) => {
    if (VALIDATOR === "joi") {
        const { error } = editUserValidation(user);
        if (error) return error.details[0].message;
        return "";
    }
};
const validateLogin = (user) => {
    if (VALIDATOR === "joi") {
        const { error } = loginValidation(user);
        if (error) return error.details[0].message;
        return "";
    }
};
exports.validateRegistration = validateRegistration;
exports.validateLogin = validateLogin;
exports.validateEditUser = validateEditUser;