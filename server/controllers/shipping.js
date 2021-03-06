const easypost = require('node-easypost')(require('../../credentials').easyPostApiKey)
const logger = require('./logger')

const fromAddress = {
  name: 'NightWalker Paperwork',
  street1: '1212 SE Powell Blvd',
  street2: '',
  city: 'Portland',
  state: 'OR',
  zip: '97202',
  phone: '484-424-9255',
  email: 'paperwork@nightwalker.clothing',
  fromName: 'NightWalker Paperwork'
}

function createAddress (shippingDetails, callback) {
  const toAddress = {
    name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
    street1: shippingDetails.address1,
    street2: shippingDetails.address2,
    city: shippingDetails.city,
    state: shippingDetails.state,
    zip: shippingDetails.zip,
    phone: shippingDetails.phone,
    email: shippingDetails.email
  }

  easypost.Address.create(toAddress, (err, toAddress) => {
    if (err) {
      return callback(err)
    }
    toAddress.verify((err, response) => {
      if (err) {
        let error = new Error('The address you entered is invalid')
        error.type = ('AddressInvalid')
        error.status = 404
        return callback(error)
      }
      if (response.message !== undefined && response.message !== null) {
        logger.warn('Address is valid but has issue: ', response.message)
        return callback(null, response.address)
      }
      logger.info('The verified address is', response)
      return callback(null, response.address)
    })
  })
}

function createParcel (toAddress, shippingDetails, cart, emailCallback) {
  let packageType
  if (cart.length === 1) {
    packageType = 'SmallFlatRateBox'
  } else if (cart.length < 3) {
    packageType = 'MediumFlatRateBox'
  } else {
    packageType = 'LargeFlatRateBox'
  }

  easypost.Parcel.create({
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'test',
    predefined_package: packageType,
    weight: 21.2
  }, (err, parcel) => {
    if (err) {
      return emailCallback(err)
    }
    logger.info('parcel create returns\n\n', parcel)
    createShipment(parcel, toAddress, shippingDetails, emailCallback)
  })
}

function createShipment (parcel, toAddress, shippingDetails, emailCallback) {
  easypost.Shipment.create({
    to_address: toAddress,
    from_address: fromAddress,
    parcel: parcel
  }, (err, shipment) => {
    if (err) {
      return emailCallback(err)
    }
    shipment.buy({rate: shipment.lowestRate()}, (err, shipment) => {
      if (err) {
        return emailCallback(err)
      }
      emailCallback(null, shipment, fromAddress)
    })
  })
}

module.exports = {
  createAddress,
  createParcel
}

