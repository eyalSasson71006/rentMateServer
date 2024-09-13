const mongoose = require("mongoose");

const Amenities = new mongoose.Schema({
    airConditioning: Boolean,
    heating: Boolean,
    wifi: Boolean,
    parking: Boolean,
    washingMachine: Boolean,
    dryer: Boolean,
    dishwasher: Boolean,
    balcony: Boolean,
    pool: Boolean,
    gym: Boolean,
    elevator: Boolean,
    petFriendly: Boolean,
    furnished: Boolean,
    securitySystem: Boolean,
    fireplace: Boolean,
    garden: Boolean,
    rooftopAccess: Boolean,
    smartHomeFeatures: Boolean,
    cableTV: Boolean,
    outdoorSeating: Boolean,
    kitchenAppliances: Boolean,
    smokeDetectors: Boolean,
    wheelchairAccessible: Boolean,
});

module.exports = Amenities;