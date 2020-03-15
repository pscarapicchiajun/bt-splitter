const paypal = require('paypal-rest-sdk');
const braintree = require("braintree");

var clientId = process.env.CLIENT_ID;
var secret = process.env.SECRET;
var sandbox = true;

const gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   process.env.M_ID,
    publicKey:    process.env.PUBLIC,
    privateKey:   process.env.PRIVATE
});

