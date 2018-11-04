var debug = require("debug")("training:user:controller");
var strings = require("../util/strings");
var jwt = require("jsonwebtoken")
var config = require("../config/config")()
var cripto = require("../util/crypto")()

function userController(firebaseAdmin){
    this.firebaseAdmin = firebaseAdmin;
    this.userList = [];
}

userController.prototype.internalGetAllUsers = function(callback, nextPageToken){
    var self = this;
    self.firebaseAdmin.auth().listUsers(10, nextPageToken)
        .then(function(listUsersResult) {
            listUsersResult.users.forEach(function(userRecord) {
                // format the user object before add it to the list
                var user = {
                    id: userRecord.uid,
                    email: userRecord.email,
                    emailVerified: userRecord.emailVerified,
                    disabled: userRecord.disabled,
                    creationTime: userRecord.metadata.creationTime,
                    data: userRecord
                };
                self.userList.push(user);
            });
            if (listUsersResult.pageToken) {
                self.internalGetAllUsers(callback, listUsersResult.pageToken);
            }
            // run callback
            callback.call(self, null);
        })
        .catch(function(error) {
            // run callback
            callback.call(self, error);
        });
};


userController.prototype.getUsers = function(request, response, next){
    var self = this;
    self.userList = [];
    var callback = function(error){
        if (error === null){
            response.status(201);
            response.send(self.userList);
        } else {
            response.status(501);
            response.send(error);
        }        
    };
    self.internalGetAllUsers(callback);
};

userController.prototype.login = function(request, response, next){
    var self = this;
    var data = request.body.data;
    
    // validação
    if (strings.isEmpty(data) === true){
        response.status(404);
        response.send("Campo data não encontrado");
    }
    
    // o campo data está em formato base64 e dividido em 2 partes
    // parte 1: IV
    // parte 2: login | senha
    var parts = data.split('.');

    if (parts.length !== 2){
        response.status(400);
        response.send("Campo data em formato inválido");
    }

    // extrai os campos que estão criptografados
    var iv = parts[0];
    var content = parts[1];

    // parametros para decriptar o texto
    var cryptoAlgorithmic = config.parameters().cryptoAlgorithmic;
    var cryptoKey = config.parameters().cryptoKey;

    console.log("iv => ", iv);
    console.log("content => ", content);
    console.log("cryptoAlgorithmic => ", cryptoAlgorithmic);
    console.log("cryptoKey => ", cryptoKey);

    // decripta o conteúdo enviado
    try {
        var login_and_password = cripto.decrypt(cryptoAlgorithmic, cryptoKey, iv, content);
        var login = login_and_password.split('|')[0];
        var password = login_and_password.split('|')[1];
    
        var token = jwt.sign({sub:login, iss: config.parameters().tokenIssue}, config.parameters().tokenPassword);
        var user = {name: "renato matos", email: login, accessToken: token};    
        response.status(201);
        response.json(user);
    } catch (error){
        response.status(501);
        response.json("Não foi possível decriptar o conteúdo informado!");
    }    
};

userController.prototype.createUser = function(request, response, next){
    // captura os parametros
    var id = request.body.id;
    var nome = request.body.nome;
    var email = request.body.email;
    var password = request.body.password;
    
    // validação
    if (strings.isEmpty(id) === true){
        response.status(404);
        response.send("id não informado");
    }
    if (strings.isEmpty(nome) === true){
        response.status(404);
        response.send("nome não informado");
    }
    if (strings.isEmpty(email) === true){
        response.status(404);
        response.send("email não informado");
    }
    if (strings.isEmpty(password) === true){
        response.status(404);
        response.send("password não informado");
    }

    this.firebaseAdmin.auth().createUser({
        uid: id,
        displayName: _nome,
        email: _email,
        password: _password,
        customPassword: _password
    })
        .then(function(userRecord) {
            response.status(201);
            response.send(userRecord.toJSON());
        })
        .catch(function(error) {
            response.status(501);
            response.send(error);
        });
};

module.exports = function(firebaseAdmin){
    return new userController(firebaseAdmin);
};
