//Validation
const Joi = require('@hapi/joi');

const registerValidation = (bodyData) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(bodyData);
}

const loginValidation = (bodyData) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(bodyData);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;