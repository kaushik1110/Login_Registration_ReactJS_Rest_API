const Joi = require('joi');

const userValidation = data => {

    const  schema = Joi.object({
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

    const  schema = Joi.object({
        
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


module.exports.userValidation = userValidation;
module.exports.loginValidation = loginValidation;