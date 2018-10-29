var debug = require("debug")("treinamento:util:time");
var strings = require("./strings");

function timeUtil(){
    this.moment = require("moment");
};

timeUtil.prototype.now = function(){
    return this.moment().format('DD/MM/YYYY hh:mm:ss a');
};

timeUtil.prototype.utc = function(){
    return this.moment().utc().format('DD.MM.YYYY HH:mm');
};

timeUtil.prototype.utcDate = function(){
    return this.moment().utc().add(-3, "h").format('DD.MM.YYYY');
};

timeUtil.prototype.utc_min_match = function(){
    return this.moment().utc().add(-3, "h").format('DD.MM.YYYY HH:mm');
};

// strDate: DD.MM.YYYY HH:mm
timeUtil.prototype.extractHour = function(strDateTime){
    var time = strDateTime.split(" ")[1];
    debug("time => ", time);
    var hour = time.split(":")[0];
    debug("hour => ", hour);
    return strings.toInt(hour);
};


// date: 23.11.2016 14:00
timeUtil.prototype.toDateTime = function(strDate, strTime){
    var dateParts = strDate.split('.');
    var day = dateParts[0];
    var month = parseInt(dateParts[1])-1;
    var year = dateParts[2];
    var timeParts = strTime.split(":");
    var hour = timeParts[0];
    var min = timeParts[1];
    var utcTime = this.moment.utc([year, month, day, hour, min]);
    return this.moment(utcTime).utc().add(utcTime.utcOffset(), 'm');
};

// date: 23.11.2016
timeUtil.prototype.toDate = function(strDate){
    try
    {
        var dateParts = strDate.split('.');
        var day = dateParts[0];
        var month = parseInt(dateParts[1])-1;
        var year = dateParts[2];
        var utcTime = this.moment.utc([year, month, day]);
        return this.moment(utcTime).utc().add(utcTime.utcOffset(), 'm');
    }
    catch(error)
    {
        console.debug("time.toDate => ", error);
        return null;
    }    
};

// date: 23.11.2016
timeUtil.prototype.IsValidDate = function(strDate){
    return this.toDate(strDate).isValid();
};

timeUtil.prototype.year = function(){
    return this.moment().format('YYYY');
};

module.exports = new timeUtil();