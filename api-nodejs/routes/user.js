var express = require("express");
var router = express.Router();

module.exports = function(firebaseAdmin){

    this.documentController = require("../controller/document")(firebaseAdmin);
    this.userController = require("../controller/user")(firebaseAdmin);

    router.get('/:userId/documents', documentController.getDocuments.bind(documentController));
    router.post('/:userId/document', documentController.createDocument.bind(documentController));
    
    router.get('/users', userController.getUsers.bind(userController));
    router.post('/login', userController.login.bind(userController));
    router.post('/', userController.createUser.bind(userController));    
    
    return router;
};