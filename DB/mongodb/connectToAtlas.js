const mongoose = require("mongoose");

const connectionStringForAtlas = ""

const connectToAtlasDb = async () => {
    try {
        await mongoose.connect(connectionStringForAtlas);
        console.log("Connected to MongoDB in Atlas");
    } catch (error) {
        console.error("Could not connect to MongoDB", error.message);
    }
};

module.exports = connectToAtlasDb;