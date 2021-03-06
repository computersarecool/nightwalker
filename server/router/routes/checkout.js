const router = require('express').Router()
const expressJwt = require('express-jwt')
const secret = require('../../../credentials').jwtSecret
const databaseController = require('../../controllers/database')
const shippingController = require('../../controllers/shipping')
const mailController = require('../../controllers/mail')
const stripeCharge = require('../../controllers/stripe')
const validator = require('validator')

// Check if this is a registered user and validate email
router.use('/', expressJwt({secret: secret, credentialsRequired: false}), (req, res, next) => {
  // Input validation
  if (!req.body || !req.body.shippingDetails) {
    const error = new Error('Your request is not valid')
    error.name = 'Missing Shipping Data'
    error.status = 400
    error.type = 'MalformedData'
    return next(error)
  }
  if (!validator.isEmail(req.body.shippingDetails.email)) {
    const error = new Error('Your email address is not valid')
    error.name = 'Invalid Email'
    error.status = 400
    error.type = 'MalformedData'
    return next(error)
  }
  // The req.user will only exist if logged in (JWT)
  if (req.user) {
    return getUser(req, res, next)
  }
  checkout(req, res, req.body.user, next)
})

function getUser (req, res, next) {
  databaseController.findUserByEmail(req.user.email, (err, user) => {
    if (err) {
      return next(err)
    }
    checkout(req, res, user, next)
  })
}

function checkout (req, res, user, next) {
  // Input validation
  if (!Array.isArray(user.cart)) {
    const error = new Error('There was an error with your cart data')
    error.type = 'MalformedDataException'
    error.status = 400
    return next(error)
  }

  const shippingDetails = req.body.shippingDetails

  databaseController.getTotalCost(user.cart, (err, amount) => {
    if (err) {
      return next(err)
    }
    // charge in Stripe
    stripeCharge(user, amount, req.body.stripeToken, shippingDetails.email, (err, user) => {
      if (err) {
        return next(err)
      }
      // create address
      shippingController.createAddress(shippingDetails, (err, toAddress) => {
        if (err) {
          return next(err)
        }
        // create parcel
        shippingController.createParcel(toAddress, shippingDetails, user.cart, (err, shipmentInfo) => {
          if (err) {
            return next(err)
          }

          // send back the simplified user
          let responseUser = {cart: []}
          if (user.firstName) {
            responseUser.email = user.email
            responseUser.firstName = user.firstName
          }
          res.json(responseUser)

          // add order information for email purposes
          databaseController.getDetailsBySku(user.cart, (err, details) => {
            if (err) {
              return next(err)
            }

            shippingDetails.individualDetails = details
            shippingDetails.totalCost = amount
            // send email notifications and save order in db
            mailController.formatPurchaseEmail(shipmentInfo, shippingDetails, (rawMailOptions, simpleMailOptions) => {
              databaseController.createOrder(user, shippingDetails, order => {
                const simpleOrderNumber = order._id.toString().substr(-10)
                simpleMailOptions.orderNumber = simpleOrderNumber
                mailController.emailCustomer(simpleMailOptions, shippingDetails)
                mailController.sendRawEmail(rawMailOptions)
                order.orderNumber = simpleOrderNumber
                order.trackingCode = simpleMailOptions.trackingCode
                // Remove items from database
                databaseController.removeItems(user.cart)
                // Save items
                databaseController.saveOrder(order, user)
              })
            })
          })
        })
      })
    })
  })
}

module.exports = router
