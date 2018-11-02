const NodeRSA = require('node-rsa');

function rsaUtil(){}

rsaUtil.prototype.generateKeyPair = function(size, privateFormat, publicFormat){
    let key = new NodeRSA({b: size});
    let privateKey = key.exportKey(privateFormat);
    let publicKey = key.exportKey(publicFormat);
    return {
        "private": privateKey,
        "public": publicKey,
        "size": size
    }
}

rsaUtil.prototype.encrypt = function(content, size, publicKey, publicFormat){
    let key = new NodeRSA({b: size});
    key.importKey(publicKey, publicFormat);
    return key.encrypt(content, "base64")
}

rsaUtil.prototype.decrypt = function(content, size, privateKey, privateFormat){
    let key = new NodeRSA({b: size});
    key.importKey(privateKey, privateFormat);
    return key.decrypt(content, "utf8")
}

module.exports = function(){
    return new rsaUtil();
}