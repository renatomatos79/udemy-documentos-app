var base64 = require('base-64');

function stringUtil(){}

stringUtil.prototype.guid = function(){
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

stringUtil.prototype.format = function (str, values) {
	return str.replace(/{(\d+)}/g, function(match, number) {
		return typeof values[number] != 'undefined' ? values[number]: match;
	});
},

stringUtil.prototype.toInt = function(str){
	var value = parseInt(str);
	return isNaN(value) ? 0 : value;
};

stringUtil.prototype.isEmpty = function(str){
	return (str === "") || (str === null) || (str === undefined);
};

stringUtil.prototype.isBoolean = function(value){
	if (this.isEmpty(value))
	{
		return false;		
	}
	return (value === true) || (value === false);
};

stringUtil.prototype.isTime = function(value){
	if (this.isEmpty(value))
	{
		return false;		
	}
	// pega a hora e minuto
	var parts = value.split(":");
	if (parts.length !== 2)
	{
		return false;
	}
	var hour = this.toInt(parts[0]);
	var min = this.toInt(parts[1]);
	// valida hora e minuto
	return ((hour >= 0 && hour <= 23) && (min >= 0 && min <= 59))
};

stringUtil.prototype.fromBase64 = function(str){
	if (this.isEmpty(str)){
		return "";
	}	
	return base64.decode(str);
};

module.exports = new stringUtil();
