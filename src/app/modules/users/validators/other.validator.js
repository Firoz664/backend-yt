const Joi = require('joi');

const userCreateSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().optional(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    mobileNumber: Joi.optional(),
    address:Joi.optional(),
    gender:Joi.optional(),
    subscribers:Joi.optional(),
    profileImg:Joi.optional(),
    subscribedUsers:Joi.optional(),
    loacation:Joi.optional()
 
});


module.exports = {
    userCreateSchema
}