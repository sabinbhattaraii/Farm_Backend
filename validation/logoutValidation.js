import Joi from 'joi';

const logoutValidationSchema = Joi.object().keys({
    token: Joi.string(),
}).unknown(false)

export default logoutValidationSchema;