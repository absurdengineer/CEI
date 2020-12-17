const Joi = require('joi')

const userSchema = Joi.object({
    name : Joi.string().min(3).max(255).required(),
    email : Joi.string().max(255).email().required(),
    password : Joi.string().alphanum().min(8).required(),
    role : Joi.string().valid('admin','user','superadmin')
})

const validateUser = user => userSchema.validate(user)

module.exports.userSchema = userSchema
module.exports.validateUser = validateUser