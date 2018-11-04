var crypto = require('crypto');

function cryptoUtil(){}

cryptoUtil.prototype.decrypt = function(cryptoAlgorithmic, cryptoKey, cryptoIV, content) {
    let key = new Buffer(cryptoKey, 'utf-8');
    let iv = new Buffer(cryptoIV, 'base64');
    let encrypted = new Buffer(content, 'base64');
    let decipher = crypto.createDecipheriv(cryptoAlgorithmic, key, iv);
    let decoded = decipher.update(encrypted, 'binary', 'ascii');
    decoded += decipher.final('ascii');
    return  decoded;
}

module.exports = function(){
    return new cryptoUtil();
}