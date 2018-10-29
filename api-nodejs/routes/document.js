var debug = require("debug")("treinamento:routes:document");
var express = require("express");
var router = express.Router();

module.exports = function(firebaseAdmin){

    this.controller = require("../controller/document")(firebaseAdmin);

    router.delete('/:id', controller.deleteDocument.bind(controller));
    
    return router;
};