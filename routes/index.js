/**
 *	Make HTTP GET request for the home page
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Grand Theft Auto' });
});

module.exports = router;
