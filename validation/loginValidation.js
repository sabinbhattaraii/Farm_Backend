import Joi from "joi";

const loginValidationSchema = Joi.object()
    .keys({
        email: Joi.string().email().required().messages({
            'string.empty': 'Email is required',
            'string.email': 'Email must be a valid email address'
        }),

        password: Joi.string()
            .min(8)
            .max(20)
            .required()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$"))
            .messages({
                'string.empty': 'Password is required',
                'string.min': 'Password should have a minimum length of 8 characters'
            }),
    })
    .unknown(false);

export default loginValidationSchema;