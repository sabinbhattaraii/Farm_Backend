import Joi from 'joi';

const updateAboutUsValidationsSchema = Joi.object({

    title: Joi.string()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Title cannot be empty',
            'any.required': 'Title is required',
        }),

    description: Joi.string()
        .optional()
        .messages({
            'string.empty': 'Description cannot be empty',
            'any.required': 'Description is required',
        }),

    image: Joi.string()
        .uri()
        .optional()
        .messages({
            'string.uri': 'Image must be a valid URL',
            'string.empty': 'Image cannot be empty',
            'any.required': 'Image is required',
        }),

    history: Joi.string()
        .optional()
        .messages({
            'string.empty': 'History cannot be empty',
            'any.required': 'History is required',
        }),

    vision: Joi.string()
        .optional()
        .messages({
            'string.empty': 'Vision cannot be empty',
            'any.required': 'Vision is required',
        }),
});

export default updateAboutUsValidationsSchema;