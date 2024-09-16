const Apartment = require("./apartment");

const createApartment = async (newApartment) => {
    try {
        let apartment = new Apartment(newApartment);
        apartment = await apartment.save();
        return apartment;
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
};

const getApartments = async () => {
    try {
        let apartments = await Apartment.find();
        return apartments;
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
};

const getRecommendedApartments = async () => {
    try {
        let apartments = await Apartment.find().sort({rating:1});
        return apartments;
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
};

module.exports = { createApartment, getApartments, getRecommendedApartments };