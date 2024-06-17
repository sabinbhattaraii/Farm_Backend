import Joi from "joi";

const forgetPasswordValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address'
    }),
})

export default forgetPasswordValidationSchema;