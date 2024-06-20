import Joi from "joi";

const updatecontactValidationSchema = Joi.object().keys({
    email: Joi.string()
        .email()
        .optional()
        .messages({
            'string.email': 'Email must be a valid email address',
        }),
    address: Joi.string()
        .optional(),
    contact_number: Joi.string()
        .pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
        .optional()
        .messages({
            'string.pattern.base': 'Contact number must be in the format of (123) 456-7890',
        }),
    description: Joi.string().allow('').optional(),
});

export default updatecontactValidationSchema;