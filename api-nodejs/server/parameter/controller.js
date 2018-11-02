var debug = require("debug")("training:parameter:controller");
var config = require("../config/config")()
var rsaKeys = require("../config/rsa/key.json")
var rsa = require("../util/rsa")()

function parameterController(firebaseAdmin){
    this.firebaseAdmin = firebaseAdmin;
}

parameterController.prototype.generate = function(request, response, next){
    var key = rsa.generateKeyPair(config.parameters().rsaKeySize, config.parameters().rsaKeyPrivateFormat, config.parameters().rsaKeyPublicFormat)
    debug("key => ", key)
    response.status(201);
    response.send(key)
};

parameterController.prototype.getKey = function(request, response, next){
    response.status(201);
    response.send({
        "keySize": rsaKeys.size,
        "publicKey": rsaKeys.public
    });
};

parameterController.prototype.encrypt = function(request, response, next){
    var word = request.body.content
    var content = rsa.encrypt(word, rsaKeys.size, rsaKeys.public, config.parameters().rsaKeyPublicFormat)
    response.status(201);
    response.json({"content": content})
};

parameterController.prototype.decrypt = function(request, response, next){
    var word = request.body.content

    debug("word => ", word)
    debug("rsaKeys.size => ", rsaKeys.size)
    debug("rsaKeys.private => ", rsaKeys.private)
    debug("rsaKeyPrivateFormat => ", config.parameters().rsaKeyPrivateFormat)

    var content = rsa.decrypt(word, rsaKeys.size, rsaKeys.private, config.parameters().rsaKeyPrivateFormat)
    response.status(201);
    response.json({"content": content})
};


module.exports = function(firebaseAdmin){
    return new parameterController(firebaseAdmin);
};
