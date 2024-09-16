const connectToLocalDb = require("./mongodb/connectToMongodbLocally");
const connectToAtlasDb = require("./mongodb/connectToAtlas");

const ENVIRONMENT = "development";

const connectToDb = async () => {
    if (ENVIRONMENT === "development") {
        await connectToLocalDb();
    }
    if (ENVIRONMENT === "production") {
        await connectToAtlasDb();
    }
};

module.exports = connectToDb;