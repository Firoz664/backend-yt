const _commentService = require('./comments.services')
const errors = {}
// const ApiFeatures = require('../../common/helpers/ApiFilter');

exports.createComment = async (req, res, next) => {
    try {
        const commentPayload = req.body
        const result = await _commentService.docreateComment(commentPayload)
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
exports.getAllComments = async (req, res, next) => {
    try {
        const videoId=req.query;
        const result = await _commentService.doGetAllComment(videoId)
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
exports.deleteComment = async (req, res, next) => {
    try {
        let commentId = req.body.commentId
        const result = await _commentService.doDeleteComment(commentId)
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
exports.updateComment = async (req, res, next) => {
    try {
        let data = req.body
        const result = await _commentService.doUpdatecomment(data)
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

// exports.GetAllSale=async(req,res)=>{

    
//     const resultPerpage=6
//     productCount=await saleData.countDocuments()

//     const ApiFeature= new ApiFeatures(saleData.find(),req.query).search().filter().pagination(resultPerpage)
//     let products = await ApiFeature.query;
//     res.status(200).json({
//         success:true,
//         products,
//         productCount
//     })
// }



 