const mongoose = require("mongoose");
const Name = require("../../helpers/mongodb/Name");
const { EMAIL, PHONE } = require("../../helpers/mongodb/mongooseValidators");
const Image = require("../../helpers/mongodb/Image");
const Address = require("../../helpers/mongodb/Address");

const userSchema = new mongoose.Schema({
    name: Name,
    email: EMAIL,
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone: PHONE,
    image: Image,
    address: Address,
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

});

const User = mongoose.model("user", userSchema);

module.exports = User;