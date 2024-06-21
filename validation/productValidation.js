import Joi from 'joi';

const productValidationSchema = Joi.object({
    product_title: Joi.string().trim().min(1).max(255).required().messages({
        'string.empty': 'Product title cannot be empty',
        'string.min': 'Product title must have at least 1 character',
        'string.max': 'Product title must have at most 255 characters',
    }),
    description: Joi.string().trim().min(1).required().messages({
        'string.empty': 'Description cannot be empty',
    }),
    image: Joi.string().uri().required().messages({
        'string.empty': 'Image URL cannot be empty',
        'string.uri': 'Image must be a valid URL',
    }),
    price: Joi.number().positive().required().messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be a positive number',
    }),
    quantity: Joi.number().integer().positive().min(1).required().messages({
        'number.base': 'Quantity must be a number',
        'number.integer': 'Quantity must be an integer',
        'number.min': 'Quantity must be at least 1',
        'number.positive': 'Quantity must be a positive number',
    }),
    categoryId: Joi.number().integer().positive().required().messages({
        'number.base': 'Category ID must be a number',
        'number.integer': 'Category ID must be an integer',
        'number.positive': 'Category ID must be a positive number',
    }),
});

export default productValidationSchema;