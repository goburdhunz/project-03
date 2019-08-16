const router = require('express').Router()
const homeController = require('../controllers/pages')
const burgerController = require('../controllers/burgers')
const authController = require('../controllers/auth')

router.get('/', homeController.home)

router.route('/burgers')
  .get(burgerController.index)

router.post('/register', authController.register)

module.exports = router
