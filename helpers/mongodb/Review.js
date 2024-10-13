const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("./mongooseValidators");

const Review = new mongoose.Schema({
    reviewId: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
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