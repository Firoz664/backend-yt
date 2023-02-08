const { addToS3, deletefilefroms3 } = require("./s3")
// const fileChange = require('../../common/helpers/utils/validate')
const sharp = require("sharp")

exports.uploadFiles = async (req, res, next) => {
    try {
        const {
            files
        } = req;
        const {
            userId,
            type
        } = req.query;
        const data = await Promise.all(files.map(async (file) => {
            const path = `profile/${userId}/${type}`;
            file['path'] = path;
            const file_type = file.mimetype
            const file_size = file.size
            const fileData = await addToS3(file);
            // return fileData;
            return { fileData, file_type, file_size };

        }));
        return {
            status: true,
            data,
            message: "Files uploaded successfully"
        }

    } catch (error) {
        next(error);
    }
};

exports.uploadSingle = async (req, res, next) => {
    try {
        const {
            file
        } = req;
        let temp
        const { userId, type } = req.query;
        const path = `profile/${userId}/${type}`;
        if (type.startsWith("image")) {
            const fileName = file.originalname.split('.')[0] + '.jpg';
            const buffer = await sharp(file.buffer, { failOnError: false }).toFormat('jpeg').jpeg({ quality: 60 }).toBuffer().then(data => data);
            temp = {
                originalname: fileName, buffer: buffer, encoding: '7bit', mimetype: buffer.mimetype, fieldname: 'files', size: buffer.length, path: path
            }
            // }
            const result = await addToS3(temp)
            return res.json({
                msg: "uploaded successfully",
                result,
                file_type: 'image/.jpg',
                file_size: temp.size
            })
        }
        if (type.startsWith("video")) {
            temp = file
        }
        if (type.startsWith("application/")) {
            temp = file
        }
        const result = await addToS3(temp)
        return res.json({
            msg: "uploaded successfully",
            result,
            file_type: temp.mimetype,
            file_size: temp.size
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteFileS3 = async (req, res, next) => {
    try {
        const {
            url
        } = req.query;
        let d = url.split('/')
        let bucketName = d[3]
        let userId = d[4]
        let imageName = d[5]
        let path = `${bucketName}/${userId}/${imageName}`
        const result = await deletefilefroms3(path)
        return res.json({
            msg: "deleted successfully",
        })
    } catch (error) {
        next(error)
    }
}
