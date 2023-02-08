const _userService = require('./user.services')
const bcrypt = require('bcrypt');
const errors = {}


exports.createUser = async (req, res, next) => {
    try {
        const userPayload = req.body;
        const salt = await bcrypt.genSalt(10)
        if (userPayload.password != undefined) {
            const hashPassword = await bcrypt.hash(userPayload.password, salt)
            userPayload.password = hashPassword
        }
        const result = await _userService.doCreateUser(userPayload)
        if (result.status === true) {
            return res.success.OK(result.message, { response: result })
        }

        if (result.status === false) {
            errors.response = result.data
            return res.error.BadRequest(result.message, { errors })
        }

        if (result.errorType == 'MongoDB') {
            errors.response = result.data
            return res.error.UnprocessableEntity(result.message, { errors })
        }
    } catch (error) {
        next(error)
    }  
}
exports.getUserDetails = async (req, res, next) => {
    try {
        let data = req.userId;
        const result = await _userService.getUserDetails(data)
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
exports.getAllUsers = async (req, res, next) => {
    try {
        const result = await _userService.doGetAllUser()
        if (result.status === true) {
            return res.success.OK(result.message, { response: result })
        }
        if (result.status === false) {
            errors.response = result.data
            return res.error.BadRequest(result.message, { errors })
        }
        if (result.errorType == 'MongoDB') {
            errors.response = result.data
            return res.error.UnprocessableEntity(result.message, { errors })
        }
    } catch (error) {
        next(error)
    }
}


exports.deleteUser = async (req, res, next) => {
    try {
        let userId = req.body.userId
        const result = await _userService.doDeleteUser(userId)
        if (result.status === true) {
            return res.success.OK(result.message, { response: result })
        }

        if (result.status === false) {
            errors.response = result.data
            return res.error.BadRequest(result.message, { errors })
        }

        if (result.errorType == 'MongoDB') {
            errors.response = result.data
            return res.error.UnprocessableEntity(result.message, { errors })
        }
    } catch (error) {
        next(error)
    }
}
exports.updateUser = async (req, res, next) => {
    try {
        let data = req.body
        let userId = req.query
        const result = await _userService.doUpdateUser(data, userId)
        if (result.status === true) {
            return res.success.OK(result.message, { response: result })
        }

        if (result.status === false) {
            errors.response = result.data
            return res.error.BadRequest(result.message, { errors })
        }

        if (result.errorType == 'MongoDB') {
            errors.response = result.data
            return res.error.UnprocessableEntity(result.message, { errors })
        }
    } catch (error) {
        next(error)
    }
}






 