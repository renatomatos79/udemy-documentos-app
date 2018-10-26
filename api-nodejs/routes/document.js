var debug = require("debug")("treinamento:routes:document");
var express = require("express");
var router = express.Router();

module.exports = function(firebaseAdmin){

    this.controller = require("../controller/document")(firebaseAdmin);

    router.get('/documents', controller.documents.bind(controller));
    router.post('/', controller.create.bind(controller));
    router.put('/:id', controller.update.bind(controller));
    router.delete('/:id', controller.delete.bind(controller));
    
    return router;
};