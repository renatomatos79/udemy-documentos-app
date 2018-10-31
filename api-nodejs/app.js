var debug = require("debug")("treinamento:app");
var express = require("express");
var cors = require('cors')
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var app = express();
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./docs/swagger.json');
var jwt = require("./util/token")()

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
app.use('/', function(request, response, next){
    debug("request => ", request.url);
    if (request.url === "/api/v1/user/login"){
        next();
    } else {
        jwt.verify(request, response, next);
        if (response.statusCode !== 401){
            next();
        }    
    }   
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', require('./routes/index'));
app.get('*', function(req, res){
    res.redirect('/api-docs');
});

app.use(function(err, req, resp, next){
    resp.status(err.status || 500).json({
       status: err.status,
       message : err.message
    });
});

// listener
module.exports = app;
