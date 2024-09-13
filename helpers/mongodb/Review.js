const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("./mongooseValidators");

const Review = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: DEFAULT_VALIDATION,
    img: Image,
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