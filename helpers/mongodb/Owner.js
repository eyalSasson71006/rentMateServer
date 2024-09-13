const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("./mongooseValidators");

const Owner = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    fullName: DEFAULT_VALIDATION,
    img: Image,
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