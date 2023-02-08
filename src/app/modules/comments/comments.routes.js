const _commentController = require('./comments.controller');
const prefix = '/api/v1/comment';

module.exports = (app) => {
    app
        .route(prefix + '/create_comment')
        .post(_commentController.createComment);
    app
        .route(prefix + '/get_comment')
        .get(_commentController.getAllComments); 
    
    app
        .route(prefix + '/delete_comment')
        .post(_commentController.deleteComment);   
    app
        .route(prefix + '/edit_comment')
        .put(_commentController.updateComment);      
}
 