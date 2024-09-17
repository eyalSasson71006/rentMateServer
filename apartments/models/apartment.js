const mongoose = require("mongoose");
const { PHONE, DEFAULT_VALIDATION, EMAIL, URL } = require("../../helpers/mongodb/mongooseValidators");
const Amenities = require("../../helpers/mongodb/Amenities");
const Owner = require("../../helpers/mongodb/Owner");
const Review = require("../../helpers/mongodb/Review");
const Address = require("../../helpers/mongodb/Address");
const Image = require("../../helpers/mongodb/Image");

const apartmentSchema = new mongoose.Schema({
    title: DEFAULT_VALIDATION,
    subtitle: DEFAULT_VALIDATION,
    address: Address,
    price: {
        type: Number,
        min: 0,
        required: true
    },
    bedrooms: {
        type: Number,
        min: 1,
        required: true
    },
    bathrooms: {
        type: Number,
        min: 1,
        required: true
    },
    propertyType: DEFAULT_VALIDATION,
    description: {
        ...DEFAULT_VALIDATION,
        maxLength: 1024
    },
    image: Image,
    amenities: Amenities,
    owner: Owner,
    reviews: [Review],
    likes: [String],
    rating: {
        type: Number,
        default: 0
    },
    favorite: {
        type: Boolean,
        default: false
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

});

const Apartment = mongoose.model("apartment", apartmentSchema);

module.exports = Apartment;