var debug = require("debug")("training:env:dev");

// changes the env variable to developer mode
process.env['APP_ENV'] = 'DEV';

var app = require('../app/index');
var port = (process.env.PORT_HTTP || 21088);
app.set('port', port);

debug("listening to the port => ", port);

app.listen(app.get('port'), "0.0.0.0", function() {
    debug('Node app is running on port', app.get('port'));
});