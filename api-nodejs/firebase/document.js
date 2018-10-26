var debug = require("debug")("treinamento:firebase:documentFirebase");
var RSVP = require('rsvp');
var strings = require('../util/strings');

function documentFirebase(firebaseAdmin) {
    this.firebaseAdmin = firebaseAdmin;
}

documentFirebase.prototype.documents = function(user_id) {
    debug("treinamento:firebase:documentFirebase.documents...", " => ", user_id);
    var self = this;
    var promise = new RSVP.Promise(function(resolve, reject) {
        try
        {
            var documentsRef = self.firebaseAdmin.firedocument.collection('documents');
            var queryRef = documentsRef.where("user_id", "==", user_id);
            queryRef.get()
                .then((snapshot) => {
                    var lines = [];
                    snapshot.forEach((doc) => {
                        lines.push({"id" : doc.id, "data": doc.data()});
                    });
                    resolve(lines);
                })
                .catch((error) => {
                    reject(error);
                });
        }
        catch (error)
        {
            reject(error);
        }        
    });
    return promise;   
}

documentFirebase.prototype.create = function(json) {
    debug("treinamento:firebase:documentFirebase.create...", " => ", json);
    var self = this;
    var promise = new RSVP.Promise(function(resolve, reject) {
        try
        {
            var guid = json.id;
            var displayRef = self.firebaseAdmin.firedocument.collection('documents').doc(guid);
            displayRef.set(json).then((result) => { 
                resolve(result)
            }).catch((error) => {
                reject(error)
            });
        }
        catch (error)
        {
            reject(error);
        }        
    });
    return promise;   
}

documentFirebase.prototype.update = function(id, documentName) {
    debug("treinamento:firebase:documentFirebase.update...", " => ", id);
    var self = this;
    var promise = new RSVP.Promise(function(resolve, reject) {
        try
        {
            var documentRef = self.firebaseAdmin.firedocument.collection('documents').doc(id);
            debug("updating...", " => ", documentRef);
            documentRef.update({
                "document_name" : documentName
            }).then((result) => { 
                resolve(result)
            }).catch((error) => {
                reject(error)
            });
        }
        catch (error)
        {
            reject(error);
        }        
    });
    return promise;   
}

documentFirebase.prototype.delete = function(id) {
    debug("treinamento:firebase:documentFirebase.delete...", " => ", id);
    var self = this;
    var promise = new RSVP.Promise(function(resolve, reject) {
        try
        {
            var documentRef = self.firebaseAdmin.firedocument.collection('documents').doc(id);
            debug("treinamento:documentFirebase.removing...", " => ", documentRef);
            documentRef.delete().then(function(result) {
                resolve(result)
            }).catch(function(error) {
                reject(error)
            });
        }
        catch (error)
        {
            reject(error);
        }        
    });
    return promise;   
}

module.exports = function(firebaseAdmin){
    return new documentFirebase(firebaseAdmin);
};
  