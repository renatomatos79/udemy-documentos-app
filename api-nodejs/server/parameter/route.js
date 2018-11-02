var express = require("express");
var router = express.Router();

module.exports = function(firebaseAdmin){

    this.parameterController = require("./controller")(firebaseAdmin);

    router.post('/generate', parameterController.generate.bind(parameterController));
    router.get('/keys', parameterController.getKey.bind(parameterController));
    router.post('/encrypt/', parameterController.encrypt.bind(parameterController));
    router.post('/decrypt/', parameterController.decrypt.bind(parameterController));
    
    return router;
};