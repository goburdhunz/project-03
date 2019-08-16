const Burger = require('../models/Burger')

function indexRoute(req,res) {
  Burger.find(req.query)
    .then(burgers => res.json(burgers))
    .catch(err => res.json(err))
}


module.exports = {
  index: indexRoute
}
