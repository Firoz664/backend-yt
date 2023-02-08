const commentModel = require('./comments.model')
const logger = require('../../common/logger/logs');

exports.docreateComment = async (data) => {
    try {
        let comment = data;
        const result = await commentModel.create(comment);
        logger.info("/modules/auth/comment.services.js:"," doCreate sale Data ", result);
        if (result) {
            return {
                status: true,
                data: {
                    message: "sale Data Created Successfully"
                }
            }
        }else{
            return {
                status: false,
                data: "Error while creating comment"
            }
        }
 
    } catch (error) {
        logger.error("/modules/comment/comment.services.js:"," doCreatecomment ", error);
        if (error.code === 11000) {
            return {
                status: false,
                errorType: "MongoDB",
            }
        } else {
            console.log(JSON.stringify(error))
            return {
                status: false,
                message: "Error while creating comment, Try after some time!"
            }
        }
    }
}

exports.doGetAllComment = async (videoId) => {
    try {
        
        let result = await commentModel.findOne({videoId})
        logger.info("/modules/comment/comment.services.js:"," doGetAllcomments ", result);
        if (result) {
            return {
                status: true,
                data: result,
                
            }
        }else{
            return {
                status: false,
                data: "Error while getting all comments"
            }
        }
        
    } catch (error) {
        logger.error("/modules/comment/comment.services.js:"," doGetAllcomments ", error);

        if (error.code === 11000) {
            return {
                status: false,
                errorType: "MongoDB",
            }
        } else {
            console.log(JSON.stringify(error))
            return {
                status: false,
                message: "Error while getting comments, Try after some time!"
            }
        }
    }
}
exports.doDeleteComment = async (commentId) => {
    try {
        let result = await commentModel.findByIdAndDelete(commentId)
        logger.info("/modules/comment/comment.services.js:"," doDeletecomment ", result);
        if (result) {
            return {
                status: true,
                message: "comment deleted Successfully"
            }
        }else{
            return {
                status: false,
                data: "Error while deleting  comment"
            }
        }
        
    } catch (error) {
        logger.error("/modules/comment/comment.services.js:"," doDeletecomment ", error);

        if (error.code === 11000) {
            return {
                status: false,
                errorType: "MongoDB",
            }
        } else {
            console.log(JSON.stringify(error))
            return {
                status: false,
                message: "Error while deleting comment, Try after some time!"
            }
        }
    }
}
exports.doUpdatecomment = async (data) => {
    try {
        let comment = data;
        let result = await commentModel.findByIdAndUpdate()

        logger.info("/modules/comment/comment.services.js:"," doUpdatecomment ", result);
        if (result) {
            return {
                status: true,
                message: "comment updated Successfully"
            }
        }else{
            return {
                status: false,
                data: "Error while updating comment"
            }
        }
        
    } catch (error) {
        logger.error("/modules/comment/comment.services.js:"," doUpdatecomment ", error);

        if (error.code === 11000) {
            return {
                status: false,
                errorType: "MongoDB",
            }
        } else {
            console.log(JSON.stringify(error))
            return {
                status: false,
                message: "Error while updating comment, Try after some time!"
            }
        }
    }
}

