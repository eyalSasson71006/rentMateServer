
const config = require("config");
const validateApartmentWithJoi = require("./Joi/validateApartmentWithJoi");

const VALIDATOR = config.get("VALIDATOR");

const validateApartment = (apartment) => {
    if (VALIDATOR === "joi") {
        const { error } = validateApartmentWithJoi(apartment);
        return error ? error.details[0].message : null;
    }
};

module.exports = validateApartment;