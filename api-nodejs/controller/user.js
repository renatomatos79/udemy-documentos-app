var debug = require("debug")("treinamento:controller:user");
var strings = require("../util/strings");
var jwt = require("jsonwebtoken")
var config = require("../config/config")()
var token = require("../util/token")()

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
                    creationTime: userRecord.metadata.creationTime
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
    token.verify(request, response, next);
    
    
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
    
    // catch input parameters
    var email = request.body.email;
    var password = request.body.password;
    
    // validação
    if (strings.isEmpty(email) === true){
        response.status(404);
        response.send("e-mail can not be null");
    }
    if (strings.isEmpty(password) === true){
        response.status(404);
        response.send("password can not be null");
    }
    
    var token = jwt.sign({sub:email, iss: config.parameters().tokenIssue}, config.parameters().tokenPassword);
    var user = {name: "renato matos", email: email, accessToken: token};

    response.status(201);
    response.json(user);
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
