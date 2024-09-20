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

const getUsersApartments = async (userId) => {
    try {
        let apartments = await Apartment.find({ owner: userId });
        return apartments;
    } catch (error) {
        createError("Mongoose ", error);
    }
};

const updateApartment = async (apartmentId, updatedApartment) => {
    try {
        let apartment = await Apartment.findByIdAndUpdate(apartmentId, updatedApartment, { new: true });
        return apartment;
    } catch (error) {
        createError("Mongoose ", error);
    }
};

const likeApartment = async (apartmentId, userId) => {
    try {
        let apartment = await Apartment.findById(apartmentId);
        if (!apartment) {
            const error = new Error("an apartment with this ID cannot be not found in the database");
            return createError("Mongoose", error, 404);
        }
        if (apartment.likes.includes(userId)) {
            apartment.likes = apartment.likes.filter(id => id != userId);
        } else {
            apartment.likes.push(userId);
        }
        await apartment.save();
        return apartment;
    } catch (error) {
        createError("Mongoose ", error);
    }
};

const reviewApartment = async (apartmentId, reviewObj) => {
    try {
        let apartment = await Apartment.findById(apartmentId);
        if (!apartment) {
            const error = new Error("an apartment with this ID cannot be not found in the database");
            return createError("Mongoose", error, 404);
        }
        apartment.reviews.push(reviewObj);
        await apartment.save();
        return apartment;
    } catch (error) {
        createError("Mongoose ", error);
    }
};

const deleteApartment = async (apartmentId) => {
    try {
        let apartment = await Apartment.findByIdAndDelete(apartmentId);
        return apartment.reviews;
    } catch (error) {
        createError("Mongoose ", error);
    }
};

module.exports = { createApartment, getApartments, getApartmentById, getUsersApartments, updateApartment, likeApartment, reviewApartment, deleteApartment };