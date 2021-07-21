const express = require('express')
const passport = require('passport')
const router = express.Router()
const UserController = require('../controllers/UserController')
const { authMiddleware } = require('../passport/passport')
//define routes
router.get('/login', UserController.loginPage)
router.get('/dashboard', authMiddleware, UserController.dashboard)
router.get('/all-users', authMiddleware, UserController.allUsers)
router.post('/login', UserController.loginUser)
router.post('/register', UserController.registerUser)
//export the router
module.exports = router
