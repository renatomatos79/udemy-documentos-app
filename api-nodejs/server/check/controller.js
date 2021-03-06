var debug = require("debug")("training:check:controller");
var time = require("../util/time");
var pkg = require("../../package.json");

function checkController(firebaseAdmin){
    this.firebaseAdmin = firebaseAdmin;
}

checkController.prototype.time = function(request, response, next){
    response.json({
        "time": time.now()
    });
};

checkController.prototype.ping = function(request, response, next){
    response.send("PONG");
}

checkController.prototype.version = function(request, response, next){
    response.json({
        "application-name": pkg.name,
        "application-version": pkg.version,
        "application-description": pkg.description
    });
};

module.exports = function(firebaseAdmin){
    return new checkController(firebaseAdmin);
};