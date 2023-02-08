const aws = require("aws-sdk");
const config = require('./../../../config/env/config');


const {
    v4: uuidv4
} = require('uuid');

const s3 = new aws.S3({
    accessKeyId: config.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_S3_SECRET_ACCESS_KEY,
    Bucket: config.AWS_S3_BUCKET_NAME,
    region: config.AWS_S3_REGION
});
exports.addToS3 = async (file) => {
    return new Promise(async function (resolve, reject) {
        let {
            mimetype,
            originalname: filename,
            buffer,
            path
        } = file
        //console.log('path :>> ', path);
        filename = uuidv4() + filename
        const params = {
            Bucket: config.AWS_S3_BUCKET_NAME,
            Key: path + filename,
            Body: buffer,
            ContentType: mimetype,
            ACL: 'public-read'
        };
        s3.upload(params, async (err, data) => {
            try {
                if (err) {
                    return reject(new Error(err))
                } else {
                    resolve(data.Location);
                }
            } catch (err) {
                return reject(new Error(err))
            }
        });
    });
};

exports.deletefilefroms3 = async (url) => {
    return new Promise(async function (resolve, reject) {
        const params = {
            Bucket: config.AWS_S3_BUCKET_NAME,
            Key: url
        };
        s3.deleteObject(params, async (err, data) => {
            try {
                if (err) {
                    return reject(new Error(err))
                } else {
                    resolve(data.Location);
                }
            } catch (err) {
                return reject(new Error(err))
            }
        });
    });
};