const mongoose = require("mongoose");
const { URL, DEFAULT_VALIDATION } = require("./mongooseValidators");

const Image = new mongoose.Schema({
    src: URL,
    alt: {
        ...DEFAULT_VALIDATION,
        required: false
    }
});

module.exports = Image;