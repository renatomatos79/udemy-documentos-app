var db = require("./db.json");

var config = function(){
    this.environment = process.env["ENV"];
}

config.prototype.parameters = function() {
    var dbSettings = {};
    
    if (this.environment === "DEV"){
        dbSettings = db.dev;
    } else if (this.environment === "HOMOLOG") {
        dbSettings = db.homolog;
    } else {
        dbSettings = db.prod;
    }

    return {
        "database" : dbSettings,
        "node" : db.node
    }
}

module.exports = function(){
    return new config();
}