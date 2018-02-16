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
router.get('/', function(req, res) {
  return res.render('pages/index')
});

// GET /about
router.get('/about', function(req, res) {
  return res.render('pages/about')
});

// GET /contact
router.get('/contact', function(req, res) {
  return res.render('pages/contact');
});

module.exports = router;