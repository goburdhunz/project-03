const Burger = require('../models/Burger')

function indexRoute(req,res, next) {
  req.query.name = new RegExp(req.query.name, 'i')
  Burger.find(req.query)
    .then(burgers => res.json(burgers))
    .catch(next)
}


module.exports = {
  index: indexRoute
}
