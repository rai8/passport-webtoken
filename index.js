require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const passport = require('passport')
const mongoose = require('mongoose')
const usersRouter = require('./routes/user')
const { applyPassportStrategy } = require('./passport/passport')
const app = express()

//connect to database
mongoose.Promise = global.Promise
mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log(`----Database connetced successfully-----`))
  .catch(err => console.log(err))

//apply strategy to passport
applyPassportStrategy(passport)

//setting up middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))

//route middlewares
app.use('/user', usersRouter)

//defining the root route
app.get('/', (req, res) => {
  res.json('olaa amogos')
})

//listening to the server
app.listen(3000, () => console.log(`----server is up and running-----`))
