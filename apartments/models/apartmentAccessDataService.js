const { createError } = require("../../utils/handleErrors");
const Apartment = require("./apartment");

const createApartment = async (newApartment) => {
    try {
        let apartment = new Apartment(newApartment);
        apartment = await apartment.save();
        return apartment;
    } catch (error) {
        createError("Mongoose ", error);
    }
};

const getApartments = async () => {
    try {
        let apartments = await Apartment.find();
        return apartments;
    } catch (error) {
        createError("Mongoose ", error);
    }
};

const getApartmentById = async (id) => {
    try {
        let apartment = await Apartment.findById(id);
        return apartment;
    } catch (error) {
        createError("Mongoose ", error);
    }
};

module.exports = { createApartment, getApartments, getApartmentById };