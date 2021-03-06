const { model } = require('mongoose')
const { ExtractJwt, Strategy } = require('passport-jwt')
const User = require('../models/User')
const passport = require('passport')

module.exports.applyPassportStrategy = passport => {
  const options = {}
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  options.secretOrKey = process.env.JWT_SECRET

  passport.use(
    new Strategy(options, async (payload, next) => {
      // console.log('jwt', jwt_payload)
      const user = await User.findOne({ email: payload.email })

      if (user) {
        next(null, user)
      } else {
        next(null, false)
      }
    })
  )
}

module.exports.authMiddleware = passport.authenticate('jwt', { session: false })
