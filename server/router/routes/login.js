var express = require('express');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var db = require('../../database');

var Users = db.users;
var jwtSecret = require('../../../config/credentials').jwtSecret;


var router = express.Router();

function authenticate (req, res, next) {
  var body = req.body;


  if (!body.username || !body.password) {
    res.status(400).end('Must provide username or password');
  }


  // Actually need to check username and password
  Users.findOne({
    'username': body.username
  }, function (err, user) {

    if (err) {
      //Log a message so you can see what happened
      console.log("Couldn't verify user because of: " + err);
      
      res.status(500).json({
        'Message': 'Internal server error from logging in new user. Please contact support@help.com'
      });
    }

    if (user) {
      console.log('YES THERE IS A USER');
      //Make this actually check for bad username or password
      req.user = user;
      next();
    }

    if (!user) {
      
      console.log('THAT USER IS NOT HERE');
      res.status(401).end('Username or password incorrect');

    }

  });
}

router.post('/login', authenticate, function (req, res) {

  var token = jwt.sign({
    //This is where the jot is created
    username: req.user.username
  }, jwtSecret);

  res.send({
    user: req.user.username,
    token: token
  });

});

module.exports = router;