var debug = require("debug")("treinamento:routes:user");
var express = require("express");
var router = express.Router();

module.exports = function(firebaseAdmin){

    this.controller = require("../controller/user")(firebaseAdmin);

    router.post('/login', controller.login.bind(controller));
    router.post('/', controller.create.bind(controller));    
    
    return router;
};