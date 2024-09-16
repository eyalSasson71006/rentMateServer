const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("./mongooseValidators");
const Image = require("./Image");

const Owner = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    fullName: DEFAULT_VALIDATION,
    image: Image,
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = Owner;