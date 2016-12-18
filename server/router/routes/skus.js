const router = require('express').Router()
const databaseController = require('../../controllers/database')

router.post('/', (req, res, next) => {
  // req.body is and object {sku number: quantity}
  if (Array.isArray(req.body)) {
    const error = new Error('There was an error retreiving your order total')
    error.type('MalformedDataException')
    error.status = 400
    next(error)
  }
  databaseController.getItemDetails(req.body, (err, itemDetailArray) => {
    if (err) {
      return next(err)
    }
    return res.json(itemDetailArray)
  })
})

module.exports = router
