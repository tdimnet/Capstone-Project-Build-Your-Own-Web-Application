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
router.post('/:userId', function(req, res) {
  res.json({
    response: 'You sent me a post request'
  });
});


module.exports = router;
