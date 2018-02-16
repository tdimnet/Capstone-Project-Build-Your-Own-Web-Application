var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Restaurant = require('../models/restaurant');
var mid = require('../middleware');

// GET /profile

// GET /logout

// GET /login

// Post /login

// GET /register

// POST /register

// GET /
router.get('/', function(req, res, next) {
  return res.render('pages/index')
});

module.exports = router;