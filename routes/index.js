var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Restaurant = require('../models/restaurant');
var mid = require('../middleware');

// GET /profile
router.get('/profile', function(req, res) {
  return res.render('pages/profile');
});

// GET /logout
router.get('/logout', function(req, res) {
  return res.render('pages/index');
});

// GET /login
router.get('/login', function(req, res) {
  return res.render('pages/login');
});

// Post /login

// GET /register
router.get('/register', function(req, res) {
  return res.render('pages/register');
});

// POST /register
router.post('/register', function(req, res, next) {
  if (req.body.email && req.body.name && req.body.password) {
    var userData = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    };

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

    console.log(userData)
    return res.render('pages/register');
  } else {
    var err = new Error('All fields are required.');
    err.status = 400;
    return next(err);
  }
});

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