import Joi from 'joi';

const inquiryValidationSchema = Joi.object({
    //   id: Joi.number()
    //     .integer()
    //     .positive()
    //     .optional(),

    name: Joi.string()
        .min(3)
        .max(20)
        .required()
        .messages({
            'string.empty': 'Name cannot be empty',
            'any.required': 'Name is required',
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.empty': 'Email cannot be empty',
            'any.required': 'Email is required',
        }),

    phone_number: Joi.string()
        .pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
        .required()
        .messages({
            'string.pattern.base': 'Phone number must be a valid format (e.g., 123-456-7890)',
            'string.empty': 'Phone number cannot be empty',
            'any.required': 'Phone number is required',
        }),

    message: Joi.string()
        .required()
        .messages({
            'string.empty': 'Message cannot be empty',
            'any.required': 'Message is required',
        }),

    seen: Joi.boolean()
        .optional(),
});

export default inquiryValidationSchema;