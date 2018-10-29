var debug = require("debug")("treinamento:controller:user");
var strings = require("../util/strings");

function userController(firebaseAdmin){
    this.firebaseAdmin = firebaseAdmin;
    this.userList = [];
}

userController.prototype.getUsers = function(request, response, next){
    this.firebaseAdmin.auth().getUserByEmail(email)
        .then(function(userRecord) {
            response.status(201);
            response.send( userRecord.toJSON());
        })
        .catch(function(error) {
            response.status(501);
            response.send(error);
        });
};

userController.prototype.login = function(request, response, next){
    // captura os parametros
    var email = request.params.email;
    // validação
    if (strings.isEmpty(email) === true){
        response.status(404);
        response.send("email não informado");
    }
    this.firebaseAdmin.auth().getUserByEmail(email)
        .then(function(userRecord) {
            response.status(201);
            response.send( userRecord.toJSON());
        })
        .catch(function(error) {
            response.status(501);
            response.send(error);
        });
};

userController.prototype.createUser = function(request, response, next){
    // captura os parametros
    var id = request.body.id;
    var _nome = request.body.nome;
    var _email = request.body.email;
    var _password = request.body.password;
    
    // validação
    if (strings.isEmpty(id) === true){
        response.status(404);
        response.send("id não informado");
    }
    if (strings.isEmpty(_nome) === true){
        response.status(404);
        response.send("nome não informado");
    }
    if (strings.isEmpty(_email) === true){
        response.status(404);
        response.send("email não informado");
    }
    if (strings.isEmpty(_password) === true){
        response.status(404);
        response.send("password não informado");
    }

    this.firebaseAdmin.auth().createUser({
        uid: id,
        displayName: _nome,
        email: _email,
        password: _password
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
