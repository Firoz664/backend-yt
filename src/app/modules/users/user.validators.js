const errorParser = require('../../common/helpers/error.parser');
const {userCreateSchema} = require('./validators/other.validator');

exports.validateCreateUserSchema = async (req, res, next) => {
    const { error } = userCreateSchema.validate(req.body)
    if (!error) next();
    else {
        return res.error.BadRequest('BadRequest', errorParser.ValidationError(error));
    }
};

