const express = require('express')
const expressJwt = require('express-jwt')
const secret = require('../../../credentials').jwtSecret
const databaseController = require('../../controllers/database')
const router = express.Router()

// verify the JWT and sets req.user to JWT contents
router.post('/', expressJwt({secret}), (req, res, next) => {
  databaseController.findUserAndUpdate(req.user.email, req.user.items, (err, user) => {
    if (err) {
      return next(err)
    }
    res.json(user)
  })
})

// TODO: Clear cache if there is an invalid token
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    err.status = 401
    err.message = 'Invalid Token'
  }
  next(err)
})

module.exports = router
