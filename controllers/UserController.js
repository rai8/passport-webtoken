const jwt = require('jsonwebtoken')
const User = require('../models/User')

//login page
const loginPage = (req, res) => {
  res.status(200).send('Welcome to login page')
}

//signup page
const signupPage = (req, res) => {
  res.status(200).send('Welcome to login page')
}

//dashboard page
const dashboard = (req, res) => {
  res.status(200).send('Welcome to login page')
}
//register a new user
const registerUser = async (req, res) => {
  const data = req.body
  try {
    const user = await User.findOne({ email: data.email })
    if (user) return res.json({ message: 'Email already exists' })
    const newUser = new User(data)
    const savedUser = await newUser.save()
    console.log(savedUser)
    //sign token
    const token = jwt.sign({ email: savedUser.email }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    })
    return res.status(201).json({
      STATUS: 'OK',
      user: savedUser,
      token: token,
    })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

//login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    //chek if user exists
    const user = await User.findOne({ email })
    if (!user) return res.json({ message: 'User does not exists' })
    if (user.password == password) {
      //generating of tokens
      //sign token
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      })
      res.status(200).json({ message: 'Login successfull', token: token })
    } else {
      res.status(200).json({ message: 'Wrong password' })
    }
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

//get all  registered user
const allUsers = async (req, res) => {
  const users = await User.find({})
  res.status(200).json({
    message: 'OK',
    users: users,
  })
}

module.exports = { registerUser, loginUser, loginPage, signupPage, dashboard, allUsers }
