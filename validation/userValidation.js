import Joi from "joi";
import { genderEnum, roleEnum, statusEnum } from "../constant/constant.js";

const userValidationSchema = Joi.object({
    id: Joi.number().integer().positive(),

    name: Joi.string().regex(/^[a-zA-Z]*$/).min(1).max(255).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name should have a minimum length of 1 character',
        'string.max': 'Name should have a maximum length of 255 characters'
    }),

    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address'
    }),

    password: Joi.string().min(8).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password should have a minimum length of 8 characters'
    }),

    gender: Joi.string().valid(...Object.values(genderEnum)).default(genderEnum.MALE).messages({
        'any.only': 'Gender must be one of the allowed values'
    }),

    role: Joi.string().valid(...Object.values(roleEnum)).default(roleEnum.CUSTOMER).messages({
        'any.only': 'Role must be one of the allowed values'
    }),

    phone: Joi.string().allow(null, '').pattern(/^[0-9]*$/).messages({
        'string.pattern.base': 'Phone number must contain only digits'
    }),

    address: Joi.string().allow(null, '').max(255).messages({
        'string.max': 'Address should have a maximum length of 255 characters'
    }),

    profilePicture: Joi.string().uri().allow(null, '').messages({
        'string.uri': 'Profile picture must be a valid URI'
    }),

    status: Joi.string().valid(...Object.values(statusEnum)).default(statusEnum.ACTIVE).messages({
        'any.only': 'Status must be one of the allowed values'
    }),

    lastLogin: Joi.date().allow(null),

    isVerified: Joi.boolean().default(false)
});

export default userValidationSchema;