var debug = require("debug")("treinamento:routes:index");
var express = require("express");
var router = express.Router();
var firebaseAdmin = require("../firebase/admin")();
var checkRouter = require('./check')(firebaseAdmin);
var documentRouter = require('./document')(firebaseAdmin);
var userRouter = require('./user')(firebaseAdmin);
var uploadRouter = require('./upload')(firebaseAdmin);

// mapp routes
router.use('/check', checkRouter);
router.use('/document', documentRouter);
router.use('/user', userRouter);
router.use('/upload', uploadRouter);

module.exports = router;