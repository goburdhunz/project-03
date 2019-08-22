const mongoose = require('mongoose')
const axios = require('axios')


const commentSchema = new mongoose.Schema({
  content: {type: String, required: true, maxlength: 380},
  userRating: {type: Number, required: true, min: 1, max: 5},
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
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
  restaurant: restaurantSchema,
  comments: [commentSchema],
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  toJSON: {
    virtuals: true
  }
})

function roundToHalf(num) {
  return Math.round(num * 2) / 2
}

burgerSchema.virtual('avgUserRating')
  .get(function getAvgUserRating() {
    if(!this.comments) return 0
    return roundToHalf(this.comments.reduce((total, comment) => total + comment.userRating, 0) / this.comments.length)
  })

burgerSchema.virtual('totalUsers')
  .get(function getTotalUsers() {
    if(!this.comments) return 0
    return this.comments.length
  })

restaurantSchema.pre('validate', function parsepostcode(done) {
  if(!this.isModified('postcode')) return done()

  axios.post('https://api.postcodes.io/postcodes', {postcodes: [this.postcode]}, {
    params: {
      filter: 'latitude,longitude'
    }
  })
    .then((res) => {
      if(!res.data.result[0].result) {
        this.invalidate('postcode', 'Invalid postcode')
        return done()
      }
      this.latitude = res.data.result[0].result.latitude
      this.longitude = res.data.result[0].result.longitude
      done()
    })
})

module.exports = mongoose.model('Burger', burgerSchema)
