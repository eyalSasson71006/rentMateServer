const mongoose = require("mongoose");
const { PHONE, DEFAULT_VALIDATION, EMAIL, URL } = require("../../helpers/mongodb/mongooseValidators");
const Image = require("../../helpers/mongodb/image");
const Address = require("../../helpers/mongodb/address");
const Amenities = require("../../helpers/mongodb/Amenities");
const Owner = require("../../helpers/mongodb/Owner");
const Review = require("../../helpers/mongodb/Review");

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
    rating: Number,
    favorite: Boolean,
    createdAt: {
        type: Date,
        default: Date.now()
    },

});

const Apartment = mongoose.model("apartment", apartmentSchema);

module.exports = Apartment;