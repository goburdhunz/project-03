const Burger = require('../models/Burger')

function indexRoute(req,res) {
  req.query.name = new RegExp(req.query.name, 'i')
  Burger.find(req.query)
    .then(burgers => res.json(burgers))
    .catch(err => res.json(err))
}


module.exports = {
  index: indexRoute
}
