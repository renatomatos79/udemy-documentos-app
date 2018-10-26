var debug = require("debug")("treinamento:routes:check");
var express = require("express");
var router = express.Router();

module.exports = function(firebaseAdmin){

    this.controller = require("../controller/check")(firebaseAdmin);
    
    router.get('/time', this.controller.time.bind(controller));
    router.get('/ping', this.controller.ping.bind(controller));
    router.get('/version', this.controller.version.bind(controller));

    return router;
};
  