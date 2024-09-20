const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("./mongooseValidators");
const Image = require("./Image");

const Review = new mongoose.Schema({
    reviewId: mongoose.Schema.Types.ObjectId,
    username: DEFAULT_VALIDATION,
    image: Image,
    text: {
        ...DEFAULT_VALIDATION,
        maxLength: 1024
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
});

module.exports = Review;