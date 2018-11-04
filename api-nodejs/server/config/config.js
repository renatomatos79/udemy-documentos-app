var config = function(){}

config.prototype.parameters = function() {
    return {
        "tokenIssue" : "treinamento-google-firebase",
        "tokenPassword" : "treinamento-google-firebase-key",
        "cryptoAlgorithmic" : "des-ede-cbc",
        "cryptoKey": "abcdefghijklmnop"
    }
}

module.exports = function(){
    return new config();
}