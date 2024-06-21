import Joi from 'joi';

const reviewValidationSchema = Joi.object({
    full_name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .optional()
        .messages({
            'string.base': 'Full name should be a string.',
            'string.empty': 'Full name cannot be empty.',
            'string.min': 'Full name should have a minimum length of {#limit}.',
            'string.max': 'Full name should have a maximum length of {#limit}.',
            'any.required': 'Full name is required.'
        }),
    review_message: Joi.string()
        .trim()
        .optional()
        .messages({
            'string.base': 'Review message should be a string.',
            'string.empty': 'Review message cannot be empty.',
            'any.required': 'Review message is required.'
        }),
    image: Joi.string()
        .uri()
        .optional()
        .allow(null, '')
        .messages({
            'string.uri': 'Image must be a valid URL.',
        })
});

export default reviewValidationSchema;