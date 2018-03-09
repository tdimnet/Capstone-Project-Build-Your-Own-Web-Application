var mongoose = require('mongoose');
var User = require('./user');

var RestaurantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  nickName: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  restaurantName: {
    type: String,
    required: true,
    trim: true
  },
  restaurantType: {
    type: String,
    required: true
  },
  city: {
    type: String,
    trim: true
  }
});

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;