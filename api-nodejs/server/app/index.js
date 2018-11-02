var debug = require("debug")("training:app:index");
var express = require("express");
var cors = require('cors')
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var app = express();
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('../../docs/swagger.json');
var firebaseAdmin = require("../admin/firebase")();
var jwt = require("../util/token")(firebaseAdmin);
var routes = require('./route')(firebaseAdmin);
var _ = require("lodash")

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
    var urls = ["/", "/api/v1/user/login"];
    var allowed = (request.url === "/") || 
                  (_.startsWith(request.url, '/api/v1/user/login')) || 
                  (_.startsWith(request.url, '/api/v1/check')) || 
                  (_.startsWith(request.url, '/api/v1/parameter')) || 
                  (_.startsWith(request.url, '/api-docs'));

    debug("url => ", request.url, " allowed => ", allowed);
    if (allowed) {
        next();
    } else {
        jwt.verify(request, response, next);
        if (response.statusCode !== 401){
            next();
        }    
    }   
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', routes);
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
