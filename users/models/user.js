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
    },
    phone: PHONE,
    image: Image,
    address: Address,
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default:0
    },
    isOwner: {
        type: Boolean,
        default: false
    },
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