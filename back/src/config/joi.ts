import * as Joi from '@hapi/joi'
export const userSchema = Joi.object().keys({
    email: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
})
export const orderFormSchema = Joi.object().keys({
    userEmail: Joi.string().trim().required(),
    cart: Joi.array().items(Joi.object().keys({
        productId:Joi.number().required(),
        productNum:Joi.number().required()
    }))
})