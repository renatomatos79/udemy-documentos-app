var debug = require("debug")("training:admin:firebase");
var admin = require("firebase-admin");
var serviceAccount = require("../config/key/treinamento-fa36b-firebase-adminsdk-zoqok-2a025bedc6.json");
var RSVP = require('rsvp');
var mime = require('mime-types');
var strings = require("../util/strings");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "treinamento-fa36b.appspot.com"
});

function firebaseAdmin() {
  const settings = {timestampsInSnapshots: true};
  admin.firestore().settings(settings);  
  this.firestore = admin.firestore();  
  this.bucket = admin.storage().bucket();
}

firebaseAdmin.prototype.auth = function(){
    return admin.auth();
}

firebaseAdmin.prototype.fileUpload = function(filePath, remoteFile) {
  debug("fileUpload...", " => ", filePath, " to ", remoteFile);
  var self = this;
  var bucket = self.bucket;
  var fileMime = mime.lookup(filePath);
  // função responsável pelo upload usando bucket storage
  var bucketUpload = (filePath, remoteFile, fileMime) => {
      let uuid = strings.guid();
      return bucket.upload(filePath, {
            destination: remoteFile,
            uploadType: "media",
            metadata: {
              contentType: fileMime,
              metadata: {
                firebaseStorageDownloadTokens: uuid,
                sourceFilePath: filePath
              }
            }
          })
          .then((data) => {  
              let file = data[0];  
              var localPromise = new RSVP.Promise(function(resolve, reject) {
                  var downloadURL = "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid;
                  debug("downloadURL", " => ", downloadURL);                    
                  resolve(downloadURL);
              });                
              return localPromise;
          });
  }

  // executa a função bucketUpload
  var promise = new RSVP.Promise(function(resolve, reject) {
      try
      {
          bucketUpload(filePath, remoteFile, fileMime)
              .then( downloadURL => {
                  resolve(downloadURL);        
              })
              .catch(error => {
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

firebaseAdmin.prototype.fileRemove = function(remoteFile) {
    debug("fileRemove...", " => ", remoteFile);
    return this.bucket.file(remoteFile).delete();            
} 


module.exports = function(){
  return new firebaseAdmin();
};
