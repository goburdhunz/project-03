const router = require('express').Router()
const homeController = require('../controllers/pages')
const burgerController = require('../controllers/burgers')

router.get('/', homeController.home)

router.route('/burgers')
  .get(burgerController.index)



module.exports = router
