const express = require('express')
const passport = require('passport')
const router = express.Router()
const UserController = require('../controllers/UserController')
//define routes
router.get('/login', UserController.loginPage)
router.get('/dashboard', passport.authenticate('jwt', { session: false }), UserController.dashboard)
router.get('/all-users', passport.authenticate('jwt', { session: false }), UserController.allUsers)
router.post('/login', UserController.loginUser)
router.post('/register', UserController.registerUser)
//export the router
module.exports = router
