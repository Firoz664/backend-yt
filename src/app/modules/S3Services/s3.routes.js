const multer = require('multer');
const upload = multer();
const { uploadFiles, uploadSingle, deleteFileS3 } = require("./s3.services");
const prefix = '/api/v1/s3';

module.exports = (app) => {
   app
      .route(prefix + "/uploadMany")
      .post(upload.array('files', 10), uploadFiles);
   app
      .route(prefix + "/uploadOne")
      .post(upload.single('file'), uploadSingle);
   app
      .route(prefix + "/delete")
      .delete(deleteFileS3);   
}
   