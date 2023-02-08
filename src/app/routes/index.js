const appRouter = require("express").Router();

require('../modules/users/user.routes')(appRouter);
require('../modules/videos/videos.routes')(appRouter);
require('../modules/comments/comments.routes')(appRouter)
require('../modules/S3Services/s3.routes')(appRouter)

module.exports = appRouter;