
const config = require("config");
const validateApartmentWithJoi = require("./Joi/validateApartmentWithJoi");

const VALIDATOR = config.get("VALIDATOR");

const validateApartment = (apartment) => {
    if (VALIDATOR === "joi") {
        const { error } = validateApartmentWithJoi(apartment);
        if (error) return error.details[0].message;
        return "";
    }
};

module.exports = validateApartment;