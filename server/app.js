var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var apiRouter = require('./router/api');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// Open the database connection
var db = require('../database');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());

app.use('/api', apiRouter);  

// Development
if (app.get('env') === 'development') {
  app.use(express.static(path.join(__dirname, '../client')));
  app.use(express.static(path.join(__dirname, '../client/.tmp')));
  app.use(express.static(path.join(__dirname, '../client/app')));

  //Development Error handling
  app.use(function (err, req, res, next) {
    //A bad error here
    console.log(err);
    res.status(err.status || 500).send(err.message || 'There is an unknown error');
  });
}

// Production
if (app.get('env') === 'production') {
  app.use(express.static(path.join(__dirname, '/dist')));

  // Production error handling
  app.use(function (err, req, res, next) {
    // A bad error here
    res.status(err.status || 500).send(err.message || 'There is an unknown error');
  });
}

module.exports = app;

