const Joi = require("joi");

const validateApartmentWithJoi = (apartment) => {
    const urlRegex = (
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    );

    const schema = Joi.object({
        title: Joi.string().min(2).max(256).required(),
        subtitle: Joi.string().min(2).max(256).required(),
        address: Joi.object()
            .keys({
                state: Joi.string().allow(""),
                country: Joi.string().min(2).max(256).required(),
                city: Joi.string().min(2).max(256).required(),
                street: Joi.string().min(2).max(256).required(),
                houseNumber: Joi.number().min(0).required(),
                zip: Joi.number().min(0),
            })
            .required(),
        price: Joi.number().min(0).required(),
        guests: Joi.number().min(1).required(),
        bedrooms: Joi.number().min(1).required(),
        bathrooms: Joi.number().min(1).required(),
        propertyType: Joi.string().min(2).max(256).required(),
        description: Joi.string().min(2).max(1024).required(),
        image: Joi.object()
            .keys({
                src: Joi.string()
                    .ruleset.regex(urlRegex)
                    .rule({ message: "user image mast be a valid url" })
                    .allow(""),
                alt: Joi.string().min(2).max(256).allow(""),
            })
            .required(),
        amenities: Joi.object()
            .keys({
                airConditioning: Joi.boolean().required(),
                heating: Joi.boolean().required(),
                wifi: Joi.boolean().required(),
                parking: Joi.boolean().required(),
                washingMachine: Joi.boolean().required(),
                dryer: Joi.boolean().required(),
                dishwasher: Joi.boolean().required(),
                balcony: Joi.boolean().required(),
                pool: Joi.boolean().required(),
                gym: Joi.boolean().required(),
                elevator: Joi.boolean().required(),
                petFriendly: Joi.boolean().required(),
                furnished: Joi.boolean().required(),
                securitySystem: Joi.boolean().required(),
                fireplace: Joi.boolean().required(),
                garden: Joi.boolean().required(),
                rooftopAccess: Joi.boolean().required(),
                smartHomeFeatures: Joi.boolean().required(),
                cableTV: Joi.boolean().required(),
                outdoorSeating: Joi.boolean().required(),
                kitchenAppliances: Joi.boolean().required(),
                smokeDetectors: Joi.boolean().required(),
                wheelchairAccessible: Joi.boolean().required(),
            })
            .required(),
    });
    return schema.validate(apartment);
};

module.exports = validateApartmentWithJoi;