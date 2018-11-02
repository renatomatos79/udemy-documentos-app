var config = function(){}

config.prototype.parameters = function() {
    return {
        "tokenIssue" : "treinamento-google-firebase",
        "tokenPassword" : "treinamento-google-firebase-key",
        "rsaKeySize" : 1024,
        "rsaKeyPublicFormat": "pkcs8-public-pem",
        "rsaKeyPrivateFormat": "pkcs8-private-pem",
    }
}

module.exports = function(){
    return new config();
}