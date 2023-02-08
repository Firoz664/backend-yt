const _userService = require('./authUser.service')
const errors = {}

exports.loginUser = async (req, res, next) => {
    try {
        const { emailPhone, password } = req.body
        const result = await _userService.dologinUser(emailPhone, password)
        if (result.status === true) {
            return res.success.OK(result.message, { response: result })
        }

        if (result.status === false) {
            errors.response = result.data
            return res.error.BadRequest(result.message, { errors })
        }
        if (result.errorType === "NOTFOUND") {
            errors.response = result.data
            return res.error.NotFound(result.message, { errors })
        }
        if (result.errorType == 'MongoDB') {
            errors.response = result.data
            return res.error.UnprocessableEntity(result.message, { errors })
        }
    } catch (error) {
        next(error)
    }
}

exports.resetPassword = async (req, res, next) => {
    try {
        const validatedBody = req.body;
        const result = await _userService.doResetPassword(validatedBody)
        if (result.status === true) {
            return res.success.OK(result.message, { response: result })
        }
        if (result.status === false) {
            errors.response = result.data
            return res.error.NotFound(result.message, { errors })
        }
        if (result.errorType == 'MongoDB') {
            errors.response = result.data
            return res.error.UnprocessableEntity(result.message, { errors })
        }
    } catch (error) {
        next(error)
    }
}

exports.changePassword = async (req, res, next) => {
    try {
        let validatedBody = req.body;
        let userId = req.userId;
        const result = await _userService.doChangePassword(validatedBody, userId)
        if (result.status === true) {
            return res.success.OK(result.message, { response: result })
        }
        if (result.status === false) {
            errors.response = result.data
            return res.error.NotFound(result.message, { errors })
        }
        if (result.errorType == 'MongoDB') {
            errors.response = result.data
            return res.error.UnprocessableEntity(result.message, { errors })
        }
    } catch (error) {
        next(error)
    }
}




