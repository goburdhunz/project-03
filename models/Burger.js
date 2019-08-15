const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
  content: {type: String, required: true, maxlength: 380},
  userRating: {type: Number, required: true, min: 1, max: 5}
}, {
  timestamps: true
})


const burgerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  rating: {type: Number, required: true, min: 1, max: 5},
  image: {type: String, required: true},
  ingredients: {type: [String]},
  price: {type: Number, required: true},
  description: {type: String},
  isVegan: {type: Boolean, default: false},
  isVegetarian: {type: Boolean, default: false},
  restaurant: {restaurantSchema},
  comments: [commentSchema]
})
