var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Restaurant = require('../models/restaurant');
var mid = require('../middleware');

// GET /profile
router.get('/profile', function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/');
  } else {
    User
      .findById(req.session.userId)
      .exec(function(error, user) {
        if (error) {
          return next(error);
        } else {
          return res.render(
            'pages/profile',
            {
              title: 'Profile',
              name: user.name
            }
          );
        }
      })
  }
});

// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

// GET /login
router.get('/login', function(req, res) {
  return res.render(
    'pages/login',
    {
      title: 'Log In'
    }
  );
});

// Post /login
router.post('/login', function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

// GET /register
router.get('/register', function(req, res) {
  return res.render(
    'pages/register',
    {
      title: 'Sign Up'
    }
  );
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

    return res.render('pages/register');
  } else {
    var err = new Error('All fields are required.');
    err.status = 400;
    return next(err);
  }
});

// GET /
router.get('/', function(req, res) {
  return res.render(
    'pages/index',
    {
      title: 'Home'
    }
  );
});

// GET /about
router.get('/about', function(req, res) {
  return res.render(
    'pages/about',
    {
      title: 'About'
    }
  );
});

// GET /contact
router.get('/contact', function(req, res) {
  return res.render(
    'pages/contact',
    {
      title: 'Contact'
    }
  );
});

module.exports = router;