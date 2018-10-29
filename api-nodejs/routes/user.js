var debug = require("debug")("treinamento:routes:user");
var express = require("express");
var router = express.Router();

module.exports = function(firebaseAdmin){

    this.documentController = require("../controller/document")(firebaseAdmin);
    this.userController = require("../controller/user")(firebaseAdmin);

    router.get('/:userId/documents', documentController.getDocuments.bind(controller));
    router.post('/:userId/document', documentController.createDocument.bind(controller));
    
    router.get('/users', userController.getUsers.bind(controller));
    router.post('/login', userController.login.bind(controller));
    router.post('/', userController.createUser.bind(controller));    
    
    return router;
};