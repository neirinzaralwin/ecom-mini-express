const express = require('express');
const router = express.Router();
const {verifyUser} = require('../middlewares/verify_user')

const {
  signUpUser,
  signInUser,
  getUser,
} = require('../controllers/user_controller')


router.post('/register', signUpUser)
router.post('/login', signInUser)

router.route('/me').get([verifyUser], getUser)

module.exports = router