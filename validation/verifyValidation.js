import Joi from "joi";

const verifyValidationSchema = Joi.object({
    password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$"))
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password should have a minimum length of 8 characters'
        }),
});

export default verifyValidationSchema;