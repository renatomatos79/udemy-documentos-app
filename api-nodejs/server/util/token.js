var debug = require("debug")("training:util:token");
var jwt = require("jsonwebtoken")
var config = require("../config/config")()
var strings = require("../util/strings");

function tokenUtil(firebaseAdmin){
	this.firebaseAdmin = firebaseAdmin;
}

tokenUtil.prototype.extract = function (request) {
	let token = undefined;

	if (request && request.headers && request.headers.authorization){
		// Authorization: xxxx.xxxx.xxxx
		const parts = request.headers.authorization.split(' ');
		if (parts.length === 2 && parts[0] === "Bearer"){
			token = parts[1];
		}
	}
	return token;
};

tokenUtil.prototype.verify = function(request, response, next){
	var token = this.extract(request);
	if (token === undefined){
        response.status(401);
        response.json({message: "Not authorized! Token not found! On header use 'authorization Bearer __JWT__'"});
	}
	try 
	{
		jwt.verify(token, config.parameters().tokenPassword);
	} catch (err)  {
		response.status(401);
		response.json({"message": err});
	}	
}

tokenUtil.prototype.fbVerify = function(request, response, next){
	var self = this;
	var token = self.extract(request);
	debug("token => ", token);
	if (token === undefined){
        response.status(401);
        response.json({message: "Not authorized! Token not found! On header use 'authorization Bearer __JWT__'"});
	}
	try 
	{
		debug("self.firebaseAdmin => ", self.firebaseAdmin);
		
		self.firebaseAdmin.auth().verifyIdToken(token)
			.then(function(decodedToken) {
				debug("verificado => ", true);
				next();
			}).catch(function(error) {
				debug("verificado => ", error);
				
				response.status(401);
        		response.json({message: error});
			});
	} catch (err)  {
		response.status(401);
		response.json({"message": err});
	}	
}

module.exports = function(firebaseAdmin){
    return new tokenUtil(firebaseAdmin);
}
