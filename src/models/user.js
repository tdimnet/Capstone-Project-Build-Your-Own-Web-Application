'use strict';

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'A name for the user is required.'],
    trim: true
  },
  emailAddress: {
      type: String,
      required: [true, 'An email address is required.'],
      unique: true,
      trim: true
  },
  hashedPassword: {
      type: String,
      required: [true, 'Passwords empty or do not match.'],
      trim: true
  }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
