const _videoService = require('./videos.services')
const errors = {}
exports.createVideo = async (req, res, next) => {
    try {
        const validatedBody = req.query;
        const productPayload = req.body
        const result = await _videoService.doCreateVideo(productPayload,validatedBody)
        console.log(result);
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

exports.updateVideo = async (req, res, next) => {
    try {
        let data = req.body;
        let userId=req.query;
        const result = await _videoService.doUpdatevideo(userId,data)
        console.log(result);
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

exports.getAllVideo = async (req, res, next) => {
    try {
        const result = await _videoService.doGetAllvideo()
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
exports.deleteVideo = async (req, res, next) => {
    try {
        let productId = req.body.productId
        const result = await _videoService.doDeletevideo(productId)
        console.log(result);
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





 