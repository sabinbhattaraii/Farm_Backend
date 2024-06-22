import Joi from "joi";

const bookingValidationsSchema = Joi.object({
    full_name: Joi.string().trim().min(1).max(100).required().messages({
        'string.empty': 'Full name cannot be empty',
        'string.min': 'Full name must have at least 1 character',
        'string.max': 'Full name must have at most 255 characters',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',
    }),
    contact_number: Joi.string().pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/).allow(null).messages({
        'string.pattern.base': 'Contact number must be a valid phone number',
    }),
    address: Joi.string().allow(null, '').messages({
        'string.empty': 'Address cannot be empty',
    }),
    quantity: Joi.number().integer().positive().min(1).required().messages({
        'number.base': 'Quantity must be a number',
        'number.integer': 'Quantity must be an integer',
        'number.min': 'Quantity must be at least 1',
        'number.positive': 'Quantity must be a positive number',
    }),
    message: Joi.string().trim().min(1).optional().messages({
        'string.empty': 'Message cannot be empty',
    }),
    productId: Joi.number().integer().positive().required().messages({
        'number.base': 'Product ID must be a number',
        'number.integer': 'Product ID must be an integer',
        'number.positive': 'Product ID must be a positive number',
    }),
    seen: Joi.boolean().default(false).optional(),
});

export default bookingValidationsSchema;