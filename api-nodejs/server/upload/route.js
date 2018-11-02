var debug = require("debug")("training:upload:route");
var express = require("express");
var router = express.Router();

module.exports = function(firebaseAdmin){

    this.controller = require("./controller")(firebaseAdmin);

    router.post('/', controller.createUpload.bind(controller));
    router.delete('/:id', controller.deleteUpload.bind(controller))
    
    return router;
};