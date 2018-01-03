'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET /api/user
  // status: 200
  // Return the desired user
router.get('/:userId', (req, res) => {
  res.json({
    response: 'You sent me a get request'
  });
});

// POST /api/user
  // status: 201
  // Return the desired user
router.post('/:userId', (req, res) => {
  res.json({
    response: 'You sent me a post request'
  });
});


module.exports = router;
