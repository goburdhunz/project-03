const User = require('../models/User')
// const jwt = require('jsonwebtoken')
// const { secret } = require('../config/environment')

function registerRoute(req, res, next) {
  User.create(req.body)
    .then(() => res.json({ message: 'Registration successful'}))
    .catch(next)
}

module.exports = {
  register: registerRoute
}
