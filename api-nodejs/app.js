var express = require("express");
var cors = require('cors')
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var app = express();
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./docs/swagger.json');

// server config
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

// enable CORS
app.use(cors())

// body parser
app.use(bodyParser.urlencoded({extended: true,  limit: '100mb'}));
app.use(bodyParser.json());

app.use(function(req, resp, next){
    if (req.url === "/favicon.ico"){
        resp.writeHead(200, {'Content-Type': 'image/x-icon'});
        resp.end('');
    } else {
        next();
    }
});

// router
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', require('./routes/index'));

// error handling : page not found
app.use(function(req, resp, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, resp, next){
    resp.status(err.status || 500).json({
       status: err.status,
       message : err.message
    });
});

// listener
module.exports = app;
