const mongoose = require('mongoose')
const axios = require('axios')


const commentSchema = new mongoose.Schema({
  content: {type: String, required: true, maxlength: 380},
  userRating: {type: Number, required: true, min: 1, max: 5}
}, {
  timestamps: true
})

const restaurantSchema = new mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  postcode: {type: String, required: true},
  latitude: {type: Number},
  longitude: {type: Number},
  website: {type: String}
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
  restaurant: [restaurantSchema],
  comments: [commentSchema]
})


restaurantSchema.pre('validate', function parsepostcode(done) {
  if(!this.isModified('postcode')) return done()

  axios.post('https://api.postcodes.io/postcodes', {postcodes: [this.postcode]}, {
    params: {
      filter: 'latitude,longitude'
    }
  })
    .then((res) => {
      if(!res.data.result[0].result) return done()
      this.latitude = res.data.result[0].result.latitude
      this.longitude = res.data.result[0].result.longitude
      done()
    })
})

module.exports = mongoose.model('Burger', burgerSchema)
