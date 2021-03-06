const mailController = require('./mail')

module.exports = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    err.status = 401
    err.message = 'Invalid Token'
  }

  const message = err.message || 'There is an unknown error'
  const name = err.name || 'Unknown'
  const status = err.status || 500
  const type = err.type || 'UnknownException'
  const errorResponse = {
    error: {
      name,
      status,
      message,
      type
    }
  }

  // send error to user
  res.status(status).json(errorResponse)

  // notify HQ
  if (!err.status || err.status >= 500 || err.email) {
    errorResponse.stack = err.stack
    mailController.notifyHQ(errorResponse)
  }
}
