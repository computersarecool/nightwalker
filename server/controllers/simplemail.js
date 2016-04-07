var fs = require('fs');
var path = require('path');

var aws = require('aws-sdk');

var accessKeyId = require('../../../../../safe/credentials').aws_access_key_id;
var secretAccessKey = require('../../../../../safe/credentials').aws_secret_access_key;
var region = 'us-west-2';

aws.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, region: region});
var ses = new aws.SES();

// Pass in firstName, lastName, trackingCode, toAddresses, subject, fromAddress
// Database callback gets called from shippingController
function emailCustomer (emailInfo, databaseCallback) {
  var outgoingEmail;
  
  var firstNameMatch = /#FIRSTNAME/;
  var lastNameMatch = /#LASTNAME/;
  var trackingCodeMatch = /#TRACKINGCODE/;
  // TODO: Make readfile a stream
  var template = fs.readFile(path.join(__dirname, '../templates/emails', 'customer_confirmation.html'), {encoding: 'utf-8'}, function (err, data) {
    if (err) {
      throw err;
    } else {
      outgoingEmail = data.replace(firstNameMatch, emailInfo.firstName);
      outgoingEmail = outgoingEmail.replace(lastNameMatch, emailInfo.lastName);
      outgoingEmail = outgoingEmail.replace(trackingCodeMatch, emailInfo.trackingCode);

      var params = {
        Destination: {
          ToAddresses: emailInfo.toAddresses,
        },
        Message: {
          Subject: {
            Data: emailInfo.subject,
          },
          Body: {
            Html: {
              'Data': outgoingEmail,
            },
          },
        },
        Source: emailInfo.fromAddress,
      };
      
      ses.sendEmail(params, function (err, id) {
        if (err) {
          throw err;
        }
        console.log('Simple mail sent', id);
      });
    }
  });
}

//TEST
/*
var data = {
  firstName: 'joe',
  lastName: 'smith',
  trackingCode: 444,
  toAddresses: [
    'willy@willynolan.com',
    'paperwork@willynolan.com',
  ],
  subject: 'testing',
  fromAddress: 'willy@willynolan.com',
};


emailCustomer(data);
 */

module.exports = {
  emailCustomer: emailCustomer,
};
