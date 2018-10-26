var debug = require("debug")("treinamento:routes:upload");
var express = require("express");
var router = express.Router();

module.exports = function(firebaseAdmin){

    this.controller = require("../controller/upload")(firebaseAdmin);

    router.post('/', controller.create.bind(controller));
    router.delete('/:id', controller.delete.bind(controller))
    
    return router;
};