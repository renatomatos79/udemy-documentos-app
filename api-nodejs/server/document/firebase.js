var debug = require("debug")("training:document:firebase");
var RSVP = require('rsvp');
var strings = require('../util/strings');

function documentFirebase(firebaseAdmin) {
    this.firebaseAdmin = firebaseAdmin;
}

documentFirebase.prototype.getUserDocuments = function(user_id) {
    debug("getUserDocuments...", " => ", user_id);
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

documentFirebase.prototype.createUser = function(json) {
    debug("createUser...", " => ", json);
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

documentFirebase.prototype.updateDocument = function(id, documentName) {
    debug("updateDocument...", " => ", id);
    var self = this;
    var promise = new RSVP.Promise(function(resolve, reject) {
        try
        {
            var documentRef = self.firebaseAdmin.firedocument.collection('documents').doc(id);
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

documentFirebase.prototype.deleteDocument = function(id) {
    debug("deleteDocument...", " => ", id);
    var self = this;
    var promise = new RSVP.Promise(function(resolve, reject) {
        try
        {
            var documentRef = self.firebaseAdmin.firedocument.collection('documents').doc(id);
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
  