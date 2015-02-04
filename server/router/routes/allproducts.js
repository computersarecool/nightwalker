var express = require('express');
var router = express.Router();
var moment = require('moment');
var db = require('../../database');
var Products = db.Products;
router.get('/', function (req, res) {
  res.json([
    {
      "color" : "red",
      "flavor" : "cherry",
      "collection": "Alterating Current",
      "offset": "50px",
      "size": "30x30"
    },
    {
      "color" : "yellow",
      "flavor" : "lemon",
      "collection": "Alterating Current",
      "offset": "50px",
      "size": "30x30"
    },
    {
      "color" : "blue",
      "flavor" : "electricity",
      "collection": "Alterating Current",
      "offset": "50px",
      "size": "30x30"
    },
    {
      "color" : "orange",
      "flavor" : "nectarine",
      "collection": "Alterating Current",
      "offset": "50px",
      "size": "30x30"
    },
    {
      "color" : "green",
      "flavor" : "apple",
      "collection": "Alterating Current",
      "offset": "50px",
      "size": "30x30"
    },
    {
      "color" : "purple",
      "flavor" : "plum",
      "collection": "Alterating Current",
      "offset": "50px",
      "size": "30x30"
    },
    {
      "color" : "pink",
      "flavor" : "powder",
      "collection": "Alterating Current",
      "offset": "50px",
      "size": "30x30"
    },
    {
      "color" : "brown",
      "flavor" : "pink",
      "collection": "Alterating Current",
      "offset": "50px",
      "size": "30x30"
    }
  ])
});

module.exports = router;