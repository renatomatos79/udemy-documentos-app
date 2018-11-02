var debug = require("debug")("training:check:route");
var express = require("express");
var router = express.Router();

module.exports = function(firebaseAdmin){

    this.controller = require("./controller")(firebaseAdmin);
    
    router.get('/time', this.controller.time.bind(controller));
    router.get('/ping', this.controller.ping.bind(controller));
    router.get('/version', this.controller.version.bind(controller));

    return router;
};
  