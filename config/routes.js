const router = require('express').Router()
const homeController = require('../controllers/pages')
const burgerController = require('../controllers/burgers')
const authController = require('../controllers/auth')

router.get('/', homeController.home)

router.route('/burgers')
  .get(burgerController.index)
  .post(burgerController.create)

router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router
