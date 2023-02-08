const  videoModel= require('./videos.model');
const  userModel=require('../users/user.model')
const logger = require('../../common/logger/logs');

exports.doCreateVideo = async (data,validatedBody) => {
    try {
        let video = data;
        const { userId } = validatedBody;
        console.log("__________________",userId)
        let checkUser=await userModel.findOne({_id:userId})
        if(!checkUser){
            return{
                status:false,
                data:"User not found"

            }
        }
        const result = await videoModel.create(video);
        logger.info("/modules/auth/video.services.js:"," doCreate video ", result);
        if (result) {
            return {
                status: true,
                data: {
                    message: "video Created Successfully"
                }
            }
        }else{
            return {
                status: false,
                data: "Error while creating video"
            }
        }
 
    } catch (error) {
        logger.error("/modules/videos/video.services.js:"," doCreatevideo ", error);
        if (error.code === 11000) {
            return {
                status: false,
                errorType: "MongoDB",
            }
        } else {
            console.log(JSON.stringify(error))
            return {
                status: false,
                message: "Error while creating video, Try after some time!"
            }
        }
    }
}

exports.doUpdatevideo = async (data,userId) => {
    try {
        let video = data;
        let result = await videoModel.findById({_id:userId})
        if(!result){
            return{
                status:false,
                data:"video not Found"
            }
        }
        logger.info("/modules/video/video.services.js:"," doUpdatevideo ", result);
        if (result) {
            return {
                status: true,
                message: "video updated Successfully"
            }
        }else{ 
            return {
                status: false,
                data: "Error while updating video"
            }
        }
        
    } catch (error) {
        logger.error("/modules/video/video.services.js:"," doUpdatevideo ", error);

        if (error.code === 11000) {
            return {
                status: false,
                errorType: "MongoDB",
            }
        } else {
            console.log(JSON.stringify(error))
            return {
                status: false,
                message: "Error while updating video, Try after some time!"
            }
        }
    }
}
exports.doDeletevideo = async (videoId) => {
    try {
        let result = await videoModel.findByIdAndDelete(videoId)
        logger.info("/modules/video/video.services.js:"," doDeletevideo ", result);
        if (result) {
            return {
                status: true,
                message: "video deleted Successfully"
            }
        }else{
            return {
                status: false,
                data: "Error while deleting  video"
            }
        }
        
    } catch (error) {
        logger.error("/modules/video/video.services.js:"," doDeletevideo ", error);

        if (error.code === 11000) {
            return {
                status: false,
                errorType: "MongoDB",
            }
        } else {
            console.log(JSON.stringify(error))
            return {
                status: false,
                message: "Error while deleting video, Try after some time!"
            }
        }
    }
}


