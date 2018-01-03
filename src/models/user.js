'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type        : String,
    required    : [true, 'firstName cannot be blank'],
    trim        : true
  },
  lastName: {
    type        : String,
    required    : [true, 'lastName cannot be blank'],
    trim        : true
  },
  emailAdress: {
    type        : String,
    unique      : true,
    required    : [true, 'emailAdress cannot be blank'],
    trim        : true
  },
  password: {
    type        : String,
    required    : [true, 'password cannot be blank'],
    trim        : true
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
