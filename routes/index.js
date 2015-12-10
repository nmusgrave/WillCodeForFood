/**
 *	Make HTTP GET request for the home page
 */

var express = require('express');
var router = express.Router();
var game = require('../game');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/reset', function(req, res, next) {
  game.reset();
  res.redirect('/');
});

module.exports = router;
