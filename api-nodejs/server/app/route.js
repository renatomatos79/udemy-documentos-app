var debug = require("debug")("training:app:route");
var express = require("express");
var router = express.Router();

module.exports = function(firebaseAdmin){

    var checkRouter = require('../check/route')(firebaseAdmin);
    var userRouter = require('../user/route')(firebaseAdmin);
    var documentRouter = require('../document/route')(firebaseAdmin);
    var uploadRouter = require('../upload/route')(firebaseAdmin);

    // mapp routes
    router.use('/check', checkRouter);
    router.use('/user', userRouter);
    router.use('/document', documentRouter);
    router.use('/upload', uploadRouter);

    return router;
};
