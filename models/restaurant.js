var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
  nickName: {
    type: String,
    unique: true,
    required: true,
    trim: true
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