const paypal = require('paypal-rest-sdk');
const braintree = require("braintree");
const util = require('util');
const debuglog = util.debuglog('app');
const m = require('moment');

var clientId = process.env.CLIENT_ID;
var secret = process.env.SECRET;
var sandbox = true;

const gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   process.env.M_ID,
    publicKey:    process.env.PUBLIC,
    privateKey:   process.env.PRIVATE
});

function do_payout(payer_id, amount) {
  console.log('Doing payout to: ' + payer_id + ', amount: ' + amount);
}

exports.splitter = function(req, res) {
  console.log(req.query);

  const days = req.query.days ? req.query.days : 1;

  const start = m().subtract(days, 'days').format('MM/DD/YYYY 00:00');
  const end = m().subtract(days, 'days').format('MM/DD/YYYY 23:59');

  debuglog('Start date: ' + start);
  debuglog('End date: ' + end);

  gateway.transaction.search(function (search) {
    search.settledAt().between(start, end);
  }, function (err, response) {
    if (err) {
      res.json(err);
    }
    else {
      response.each(function (err, transaction) {
        debuglog(transaction);
        do_payout(transaction.customFields.partner, transaction.amount);
      });
    }
  });

  res.end('ok');

};
