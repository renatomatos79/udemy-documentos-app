var crypto = require('crypto');
var alg = 'des-ede-cbc';
var key = new Buffer('abcdefghijklmnop', 'utf-8');
var iv = new Buffer('B6z6lDKvwPs=', 'base64');
var encrypted = new Buffer('rmn5SZr8gNnXUS8rF1TGOA==', 'base64');

var decipher = crypto.createDecipheriv(alg, key, iv);
var decoded = decipher.update(encrypted, 'binary', 'ascii');
decoded += decipher.final('ascii');

console.log(decoded);