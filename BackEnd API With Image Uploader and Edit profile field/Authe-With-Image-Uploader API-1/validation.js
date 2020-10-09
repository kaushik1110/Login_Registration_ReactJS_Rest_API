const Joi = require('joi');

const userValidation = data => {

    const schema = Joi.object({
        name: Joi.string()
            .min(1)
            .required(),

        email: Joi.string()
            .min(6)
            .required()
            .email(),

        password: Joi.string()
            .min(3)
            .required()
    });

    return schema.validate(data);

}

const loginValidation = data => {

    const schema = Joi.object({

        email: Joi.string()
            .min(6)
            .required()
            .email(),

        password: Joi.string()
            .min(3)
            .required()
    });

    return schema.validate(data);

}

const userInfoValidation = data => {

    const schema = Joi.object({

        address: Joi.string()
            .min(1)
            .max(20)
            .required(),

        gender: Joi.string().required(),

        country: Joi.string()
            .min(2).
            max(10)
            .required(),


        state: Joi.string()
            .min(2)
            .max(10)
            .required(),

        city: Joi.string()
            .min(2)
            .max(10)
            .required(),

        birthdate: Joi.date()
            .required(),

        hobby: Joi.string()
            .required(),

        zip: Joi.number()
            .required()
    });

    return schema.validate(data);

}


module.exports.userValidation = userValidation;
module.exports.loginValidation = loginValidation;
module.exports.userInfoValidation = userInfoValidation;