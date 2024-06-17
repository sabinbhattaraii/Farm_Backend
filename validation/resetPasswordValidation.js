import Joi from 'joi'

const resetPasswordValidationSchema = Joi.object({
    password: Joi.string()
        .required()
        .min(8)
        .max(20)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$"))
        .messages({
            'string.empty': 'Password is required',
            "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
            "string.min": "Password must be at least 8 characters long",
        }),
})

export default resetPasswordValidationSchema;