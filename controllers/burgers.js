const Burger = require('../models/Burger')

function indexRoute(req,res, next) {
  req.query.name = new RegExp(req.query.name, 'i')
  Burger.find(req.query)
    .then(burgers => res.json(burgers))
    .catch(next)
}

function showRoute(req, res, next) {
  Burger.findById(req.params.id)
    .populate({ path: 'user', select: '-email' })
    .populate({ path: 'comments.user', select: '-email' })
    .then(burger => {
      if(!burger) return res.sendStatus(404)
      return res.json(burger)
    })
    .catch(next)
}

function createRoute(req, res, next) {
  req.body.user = req.currentUser._id
  const burger = new Burger(req.body)
  burger.save()
    .then(burger => res.status(201).json(burger))
    .catch(next)
}


module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute
}
