'use strict';

var express   = require('express');
var router    = express.Router();

var User      = require('../models/user');

// GET /api/user
  // status: 200
  // Return the desired user
router.get('/:userId', function(req, res) {
  res.json({
    response: 'You sent me a get request'
  });
});

// POST /api/user
  // status: 201
  // Return the desired user
router.post('/', function(req, res, next) {
  let password = '';
  if (
    req.body &&
    req.body.password &&
    req.body.confirmPassword &&
    req.body.password === req.body.confirmPassword
  ) {
    password = req.body.password;
  }

  let user = new User({
    fullName: req.body.fullName,
    emailAddress: req.body.emailAddress,
    hashedPassword: password
  });

  user.save(function(err) {
    if (err && err.name === 'ValidationError') {
      res.status(400);
      res.json(validationErrors(400, err.errors));
    } else {
      res
        .status(201)
        .location('/')
        .send();
    }
  })
});


function validationErrors(code, errors) {

    let errMessages = [];

    for (let err in errors) {
        if (errors[err] && errors[err].message) {
            errMessages.push({
                code: code,
                message: errors[err].message
            });
        }
    }

    return {
        message: 'Validation Failed',
        errors: {
            property: errMessages
        }
    };
}


module.exports = router;
