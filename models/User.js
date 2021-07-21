const mongoose = require('mongoose')
const { Schema } = mongoose

//define the user schema
const userSchema = new Schema({
  email: String,
  password: String,
})

//define the model from the schema
const User = mongoose.model('user', userSchema)

//export the model
module.exports = User
