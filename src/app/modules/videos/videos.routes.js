const _videoController = require('./videos.controller');

const prefix = '/api/v1/video';

module.exports = (app) => {
    app
        .route(prefix + '/add_video')
        .post(_videoController.createVideo);
    app
        .route(prefix + '/get_product')
        .get(_videoController.getAllVideo); 

    app
        .route(prefix + '/get_product')
        .put(_videoController.updateVideo);      
    app
        .route(prefix + '/delete_product')
        .delete(_videoController.deleteVideo);   
}
 