const registerValidation = require("./joi/registerValidation");
const loginValidation = require("./joi/loginValidation");
const editUserValidation = require("./joi/editUserValidation");

const config = require("config");

const VALIDATOR = config.get("VALIDATOR");

const validateRegistration = (user) => {
    if (VALIDATOR === "joi") {
        const { error } = registerValidation(user);
        return error ? error.details[0].message : null;
    }
};

const validateEditUser = (user) => {
    if (VALIDATOR === "joi") {
        const { error } = editUserValidation(user);
        return error ? error.details[0].message : null;
    }
};
const validateLogin = (user) => {
    if (VALIDATOR === "joi") {
        const { error } = loginValidation(user);
        return error ? error.details[0].message : null;
    }
};
exports.validateRegistration = validateRegistration;
exports.validateLogin = validateLogin;
exports.validateEditUser = validateEditUser;