const Joi = require("joi");

const editUserValidation = (user) => {
    const schema = Joi.object({
        name: Joi.object()
            .keys({
                first: Joi.string().min(2).max(256).required(),
                middle: Joi.string().max(256).allow(""),
                last: Joi.string().min(2).max(256).required(),
            })
            .required(),
        phone: Joi.string()
            .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)

            .rule({ message: 'user "phone" mast be a valid phone number' })
            .required(),
        image: Joi.object()
            .keys({
                src: Joi.string()
                    .ruleset.regex(
                        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
                    )
                    .rule({ message: "user image mast be a valid url" })
                    .allow(""),
                alt: Joi.string().min(2).max(256).allow(""),
            })
            .required(),
        address: Joi.object()
            .keys({
                state: Joi.string().allow(""),
                country: Joi.string().min(2).max(256).required(),
                city: Joi.string().min(2).max(256).required(),
                street: Joi.string().min(2).max(256).required(),
                houseNumber: Joi.number().required(),
                zip: Joi.number(),
            })
            .required(),
    });
    return schema.validate(user);
};

module.exports = editUserValidation;