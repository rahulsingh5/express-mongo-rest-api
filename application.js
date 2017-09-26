"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * import for 3rd party modules
 */
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
mongoose.Promise = global.Promise;
/**
 * import for local modules
 */
/**
 * instantiating the express app
 * @type {Express}
 */
var app = express();
/**
 * connecting to db
 */
mongoose.connect("mongodb://localhost/express-api");
/**
 * middlewares
 */
app.use(logger('dev'));
app.use(bodyParser.json());
/**
 * app routes
 */
app.use('/users', require('./routes/userRoutes')());
app.use('/cars', require('./routes/carRoutes')());
/**
 * catching 404 errors and forwarding them to error handler method
 */
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
/**
 * error handler
 */
app.use(function (error, req, res, next) {
    var err = app.get('env') === 'development' ? error : {};
    var status = err.status || 500;
    /**
     * this will be send to client
     */
    res.status(status).json({ error: { message: error.message } });
    /**
     * for developer use
     */
    console.error(err);
});
/**
 * listen to server
 */
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
    if (app.get('env') === 'development') {
        console.log("Server is listening at the port " + app.get('port'));
    }
    else {
        console.log("Server is listening...");
    }
});
