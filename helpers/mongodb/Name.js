const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("./mongooseValidators");

const Name = new mongoose.Schema({
    first: DEFAULT_VALIDATION,
    middle: {
        type: String,
        maxLength: 256,
        trim: true,
        lowercase: true,
    },
    last: DEFAULT_VALIDATION,
});
module.exports = Name;