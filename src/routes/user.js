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
    console.log(req.body);
    if(req.body.fullName && req.body.emailAddress && req.body.password) {
      const newUser = {
        fullName: req.body.fullName,
        emailAddress: req.body.emailAddress,
        password: req.body.password
      }

      User.create(newUser, function(error, user) {
        if(error) {
          return next(error);
        } else {
          return res
                  .status(201)
                  .location('/')
                  .send();
        }
      });

    } else {
      res
        .status(403)
        .json({
          error: 'All fields are required'
        });
    }
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
