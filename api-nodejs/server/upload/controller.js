var debug = require("debug")("training:upload:controller");
var fs = require("fs");
var path = require('path');
var strings = require("../util/strings");

function uploadController(firebaseAdmin){
    this.firebaseAdmin = firebaseAdmin;
}

uploadController.prototype.createUpload = function(request, response, next){
    var fileContent = request.body.fileContent;
    var remoteFileName = request.body.remoteFileName;
    var self = this;
    // validação
    if (strings.isEmpty(fileContent) === true){
        response.status(404);
        response.send("fileContent não informado");
    }
    if (strings.isEmpty(remoteFileName) === true){
        response.status(404);
        response.send("remoteFileName não informado");
    }
    // converte o conteudo base64 para um arquivo no disco usando o nome remoto   
    var filePath = path.resolve(__dirname, '..', 'upload', remoteFileName);
    fs.writeFile(filePath, fileContent, 'base64', function(error) {
        if (error === undefined || error === null) {
            // apos gravar o arquivo em disco, faz o upload para o Firebase e devolve o nome remoto do arquivo
            self.firebaseAdmin.fileUpload(filePath, remoteFileName)
                .then(function(result){
                    response.status(201);
                    response.json({
                        "remoteFile": result
                    });
                })
                .catch(function(error) {
                    response.status(501);
                    response.send(error);
                });
        } else {
            response.status(501);
            response.send(error);
        }
    });   
};

uploadController.prototype.deleteUpload = function(request, response, next) {   
    var id = request.params.id; 
    this.firebaseAdmin.fileRemove(id)
    .then(function (result) {
        response.status(200); 
        response.send(result);
    })
    .catch(function(error) {
        if (error.code == 404){
            response.status(200);
        } else {
            response.status(error.code);
        }        
        response.send(error);        
    });
}

module.exports = function(firebaseAdmin){
    return new uploadController(firebaseAdmin);
};
