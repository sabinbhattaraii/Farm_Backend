import Joi from 'joi';

const contactValidationSchema = Joi.object().keys({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.required': 'Email is required',
        }),
    address: Joi.string()
        .required()
        .messages({
            'string.required': 'Address is required',
        }),
    contact_number: Joi.string()
        .pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
        .required()
        .messages({
            'string.pattern.base': 'Contact number must be in the format of (123) 456-7890',
            'string.required': 'Contact number is required',
        }),
    description: Joi.string().allow('').optional(),
});

export default contactValidationSchema;