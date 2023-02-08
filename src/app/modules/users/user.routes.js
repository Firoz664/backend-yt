const _userController = require('./user.controller');
const _userValidator = require('./user.validators');
const _userAuthController=require('./authController.user')
const auth = require('../../common/helpers/utils/jwt')
const prefix = '/api/v1/users';

module.exports = (app) => {
    app
        .route(prefix + '/create_user')
        .all(_userValidator.validateCreateUserSchema)
        .post(_userController.createUser);
    
    app
        .route(prefix + '/userDetails')
        .all(auth.verifyToken)
        .get(_userController.getUserDetails);    

    app
        .route(prefix + '/get_user')
        .get(_userController.getAllUsers); 
    
    app
        .route(prefix + '/update_update')
        .put(_userController.updateUser);      
    app
        .route(prefix + '/delete_user')
        .delete(_userController.deleteUser);
    
    app
        .route(prefix + '/userLogin')
        .post(_userAuthController.loginUser); 
    
    app
        .route(prefix + '/resetPassword')
        .put(_userAuthController.resetPassword); 

    app
        .route(prefix + '/changePassword')
        .all(auth.verifyToken)
        .post(_userAuthController.changePassword);       
}
 