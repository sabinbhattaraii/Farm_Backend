import Joi from "joi";
import { genderEnum } from "../constant/constant.js";

const updateUserByAdminValidationSchema = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z]*$/).min(1).max(255).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name should have a minimum length of 1 character',
        'string.max': 'Name should have a maximum length of 255 characters'
    }),
    gender: Joi.string().valid(...Object.values(genderEnumm)).default(genderEnum.MALE).messages({
        'any.only': 'Gender must be one of the allowed values'
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
})
    .unknown(false);

export default updateUserByAdminValidationSchema;