var config = function(){}

config.prototype.parameters = function() {
    return {
        "tokenIssue" : "treinamento-google-firebase",
        "tokenPassword" : "treinamento-google-firebase-key"
    }
}

module.exports = function(){
    return new config();
}