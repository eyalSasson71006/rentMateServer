const { createError } = require("../../utils/handleErrors");
const Apartment = require("./apartment");
const config = require("config");

const DB = config.get("DB");

const createApartment = async (newApartment) => {
    if (DB === "mongodb") {
        try {
            let apartment = new Apartment(newApartment);
            apartment = await apartment.save();
            return apartment;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const getApartments = async (params = {}) => {
    if (DB === "mongodb") {
        try {
            let apartments = await Apartment.find(params.find).sort({ [params.sort]: Number(params.order) || 1 });
            return apartments;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const getApartmentById = async (id) => {
    if (DB === "mongodb") {
        try {
            let apartment = await Apartment.findById(id);
            if (apartment.reviews.length > 0) apartment = await apartment.populate("reviews.userId", "name image");
            return apartment;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const getUsersApartments = async (userId) => {
    if (DB === "mongodb") {
        try {
            let apartments = await Apartment.find({ owner: userId }).populate("reviews.userId", "name image");
            return apartments;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const updateApartment = async (apartmentId, updatedApartment) => {
    if (DB === "mongodb") {
        try {
            let apartment = await Apartment.findByIdAndUpdate(apartmentId, updatedApartment, { new: true });
            return apartment;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const likeApartment = async (apartmentId, userId) => {
    if (DB === "mongodb") {
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
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const reviewApartment = async (apartmentId, reviewObj) => {
    if (DB === "mongodb") {
        try {
            let apartment = await Apartment.findById(apartmentId);
            if (!apartment) {
                const error = new Error("an apartment with this ID cannot be not found in the database");
                return createError("Mongoose", error, 404);
            }
            apartment.reviews.push(reviewObj);
            await apartment.save();
            if (apartment.reviews.length > 0) apartment = await apartment.populate("reviews.userId", "name image");
            return apartment;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const deleteApartment = async (apartmentId) => {
    if (DB === "mongodb") {
        try {
            let apartment = await Apartment.findByIdAndDelete(apartmentId);
            return apartment;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const deleteUsersApartments = async (userId) => {
    if (DB === "mongodb") {
        try {
            let apartments = await Apartment.deleteMany({ owner: userId });
            return apartments;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const toggleUsersApartmentsUnavailable = async (userId) => {
    if (DB === "mongodb") {
        try {
            let apartments = await Apartment.find({ owner: userId });
            apartments.forEach(apartment => {
                apartment.available = false;
                apartment.save();
            });
            return apartments;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const toggleAvailability = async (apartmentId) => {
    if (DB === "mongodb") {
        try {
            let apartment = await Apartment.findById(apartmentId);
            if (!apartment) {
                const error = new Error("an apartment with this ID cannot be not found in the database");
                return createError("Mongoose", error, 404);
            }
            apartment.available = !apartment.available;
            await apartment.save();
            return apartment.available;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }
    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

module.exports = { createApartment, getApartments, getApartmentById, getUsersApartments, updateApartment, likeApartment, reviewApartment, deleteApartment, deleteUsersApartments, toggleAvailability, toggleUsersApartmentsUnavailable };