var debug = require("debug")("training:document:routes");
var express = require("express");
var router = express.Router();

module.exports = function(firebaseAdmin){

    this.controller = require("./controller")(firebaseAdmin);

    router.put('/:id', controller.updateDocument.bind(controller));
    router.delete('/:id', controller.deleteDocument.bind(controller));
    
    return router;
};