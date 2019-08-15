const Burger = require('../models/Burger')

function homeRoute (req, res, next) {
  Burger.find()
    .sort('-rating')
    .limit(3)
    .then(burgers => res.json(burgers))
    .catch(next)
}

module.exports ={
  home: homeRoute
}
