const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const Burger = require('../models/Burger')
const User = require('../models/User')
const burgerData = require('./data/burgerData')
const userData = require('./data/userData')
const { dbURI } = require('../config/environment')

mongoose.connect(dbURI, { useNewUrlParser: true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => User.create(userData))
  .then(userData => {
    const burgerDataWithUser = burgerData.map(data => {
      data.user = userData
      data.comments.map(comment => {
        comment.user = userData
      })
      return data
    })
    return Burger.create(burgerDataWithUser)
  })
  .then(() => console.log('Successfully sesame seeded!'))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close())
