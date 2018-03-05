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
          Restaurant
            .find()
            .limit(5)
            .then(function(restaurants) {
              return res.render(
                'pages/profile/profile',
                {
                  title: 'Profile',
                  name: user.name,
                  restaurants: restaurants
                }
              );
            })
        }
      })
  }
});

// GET /profile/new
router.get('/profile/new-restaurant', function(req, res) {
  if (!req.session.userId) {
    return res.redirect('/');
  } else {
    return res.render(
      'pages/profile/new-restaurant',
      {
        title: 'New Restaurant'
      }
    );
  }
});

// GET /profile/restaurant
router.get('/profile/restaurant/:id', function(req, res) {
  if (!req.session.userId) {
    return res.redirect('/');
  } else {
    return res.render(
      'pages/profile/restaurant',
      {
        title: 'Restaurant Detail'
      }
    );
  }
});

// POST /profile/restaurant
router.post('/profile/restaurant/:id', function(req, res, next) {
  if (req.body.nickName && req.body.restaurantName && req.body.restaurantType && req.body.city) {
    var restaurantData = {
      nickName: req.body.nickName,
      restaurantName: req.body.restaurantName,
      restaurantType: req.body.restaurantType,
      city: req.body.city
    };

    Restaurant.create(restaurantData, function(error) {
      if (error) {
        return next(error);
      } else {
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields are required.');
    err.status = 400;
    return next(err);
  }
});

// GET /profile/restaurant-saved
router.get('/profile/restaurant-saved/:id', function(req, res) {
  if (!req.session.userId) {
    return res.redirect('/');
  } else {
    return res.render(
      'pages/profile/restaurant-saved',
      {
        title: 'Saved restaurant detail'
      }
    );
  }
});

// GET /profile/all-restaurants
router.get('/profile/all-restaurants', function(req, res) {
  if (!req.session.userId) {
    return res.redirect('/');
  } else {
    Restaurant
      .find()
      .then(function(restaurants) {
        return res.render(
          'pages/profile/all-restaurants',
          {
            title: 'All Restaurants',
            restaurants: restaurants
          }
        );
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

module.exports = router;