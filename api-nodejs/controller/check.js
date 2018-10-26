var debug = require("debug")("treinamento:controller:check");
var time = require("../util/time");
var pkg = require("../package.json");

function checkController(firebaseAdmin){
    this.firebaseAdmin = firebaseAdmin;
}

checkController.prototype.time = function(request, response, next){
    response.json({
        "now": time.now(),
        "utc": time.utc(),
        "utc-min-match": time.utc_min_match()
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