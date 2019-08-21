const router = require('express').Router()
const homeController = require('../controllers/pages')
const burgerController = require('../controllers/burgers')
const authController = require('../controllers/auth')

const secureRoute = require('../lib/secureRoute')

router.get('/', homeController.home)

router.route('/burgers')
  .get(burgerController.index)
  .post(secureRoute, burgerController.create)

router.route('/burgers/:id')
  .get(burgerController.show)
  .put(secureRoute, burgerController.update)
  .delete(secureRoute, burgerController.delete)  

router.post('/register', authController.register)
router.post('/login', authController.login)

router.post('/burgers/:id/comments', secureRoute, burgerController.commentCreate)
router.delete('/burgers/:id/comments/:commentId', secureRoute, burgerController.commentDelete)

module.exports = router
