const mongoose = require("mongoose")

const connectToLocalDb = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/rentMateServer");
        console.log("Connected to MongoDB Locally");
    } catch (error) {
        console.error("Could not connect to MongoDB", error.message);
    }
};

module.exports = connectToLocalDb;