var express = require("express");
var router = express.Router();

module.exports = function(firebaseAdmin){

    this.documentController = require("../document/controller")(firebaseAdmin);
    this.userController = require("../user/controller")(firebaseAdmin);

    router.get('/:userId/documents', documentController.getDocuments.bind(documentController));
    router.post('/:userId/document', documentController.createDocument.bind(documentController));
    
    router.get('/users', userController.getUsers.bind(userController));
    router.post('/login', userController.login.bind(userController));
    router.post('/', userController.createUser.bind(userController));    
    
    return router;
};