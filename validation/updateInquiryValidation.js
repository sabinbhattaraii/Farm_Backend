import Joi from 'joi';

const updateInquiryValidationSchema = Joi.object({

    name: Joi.string()
        .min(3)
        .max(20)
        .optional()
        .messages({
            'string.empty': 'Name cannot be empty',
            'any.required': 'Name is required',
        }),

    email: Joi.string()
        .email()
        .optional()
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.empty': 'Email cannot be empty',
            'any.required': 'Email is required',
        }),

    phone_number: Joi.string()
        .pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
        .optional()
        .messages({
            'string.pattern.base': 'Phone number must be a valid format (e.g., 123-456-7890)',
            'string.empty': 'Phone number cannot be empty',
            'any.required': 'Phone number is required',
        }),

    message: Joi.string()
        .optional()
        .messages({
            'string.empty': 'Message cannot be empty',
            'any.required': 'Message is required',
        }),

    seen: Joi.boolean()
        .optional(),
});

export default updateInquiryValidationSchema;