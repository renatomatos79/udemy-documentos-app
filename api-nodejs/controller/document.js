var debug = require("debug")("treinamento:controller:store");
var strings = require("../util/strings");

function documentController(firebaseAdmin){
    this.firebaseAdmin = firebaseAdmin;
    this.documentFirestore = require("../firebase/document")(firebaseAdmin);
}

documentController.prototype.documents = function(request, response, next){
    var user_id = request.params.user_id;
    
    if (strings.isEmpty(user_id) === true){
        response.status(404);
        response.send("user_id não informado");
    }
    
    this.documentFirestore.documents()
        .then(function(result){
            response.status(201);
            response.send(result);
        })
        .catch(function(error) {
            response.status(501);
            response.send(error);
        });
};

documentController.prototype.create = function(request, response, next){
    // captura os parametros
    var id = request.body.id;
    var store_id = request.body.store_id;
    var store_name = request.body.store_name;
    var company_id = request.body.company_id;
    var user_id = request.body.user_id;
    
    // validação
    if (strings.isEmpty(id) === true){
        response.status(404);
        response.send("id não informado");
    }
    if (strings.isEmpty(store_id) === true){
        response.status(404);
        response.send("store_id não informado");
    }
    if (strings.isEmpty(store_name) === true){
        response.status(404);
        response.send("store_name não informado");
    }
    if (strings.isEmpty(company_id) === true){
        response.status(404);
        response.send("company_id não informado");
    }
    if (strings.isEmpty(user_id) === true){
        response.status(404);
        response.send("user_id não informado");
    }
    var json = {
        "id": id,
        "store_id": store_id,
        "store_name": store_name,
        "company_id": company_id,
        "user_id": user_id
    };

    // atualiza a base do firestore
    this.documentFirestore.create(json)
        .then(function(result){
            response.status(201);
            response.send(result);
        })
        .catch(function(error) {
            response.status(501);
            response.send(error);
        });
};

documentController.prototype.update = function(request, response, next){
    // captura os parametros :id (query string) e :store_name (body)
    var id = request.params.id;
    var store_name = request.body.store_name;
    
    // validação
    if (strings.isEmpty(id) === true){
        response.status(404);
        response.send("id não informado");
    }
    if (strings.isEmpty(store_name) === true){
        response.status(404);
        response.send("store_name não informado");
    }

    // atualiza a base do firestore
    this.documentFirestore.update(id, store_name)
        .then(function(result){
            response.status(201);
            response.send(result);
        })
        .catch(function(error) {
            response.status(501);
            response.send(error);
        });
};

documentController.prototype.delete = function(request, response, next){
    // captura os parametros
    var id = request.params.id;
    
    // validação
    if (strings.isEmpty(id) === true){
        response.status(404);
        response.send("id não informado");
    }

    // atualiza a base do firestore
    this.documentFirestore.delete(id)
        .then(function(result){
            response.status(201);
            response.send(result);
        })
        .catch(function(error) {
            response.status(501);
            response.send(error);
        });
};

module.exports = function(firebaseAdmin){
    return new documentController(firebaseAdmin);
};
