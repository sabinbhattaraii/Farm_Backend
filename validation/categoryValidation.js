import Joi from 'joi';

const categoryValidationsSchema = Joi.object({

    title: Joi.string()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Title cannot be empty',
            'any.required': 'Title is required',
        }),

    image: Joi.string()
        .uri()
        .required()
        .messages({
            'string.uri': 'Image must be a valid URL',
            'string.empty': 'Image cannot be empty',
            'any.required': 'Image is required',
        }),
});

export default categoryValidationsSchema;