var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var app = express();

// server config
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

// body parser
app.use(bodyParser({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb'}));
app.use(bodyParser());

app.use(function(req, resp, next){
    if (req.url === "/favicon.ico"){
        resp.writeHead(200, {'Content-Type': 'image/x-icon'});
        resp.end('');
    } else {
        next();
    }
});

// router
app.use('/', require('./routes/index'));

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
