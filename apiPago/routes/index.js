const {MercadoPagoConfig,Payment} = require ('mercadopago')

// Step 2: Initialize the client object
const client = new MercadoPagoConfig(
  {
    accessToken: 'access_token',
    options: { timeout: 5000, idempotencyKey: 'abc' }
  }
);

// Step 3: Initialize the API object
const payment = new Payment(client);


var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST criar-pix */
router.post("/criar-pix", function(req, res, next) {
  console.log("REQUEST");
  console.log(req.body);

  const body = {
    transaction_amount: req.body.transaction_amount,
    description: req.body.description,
    payment_method_id: req.body.paymentMethodId,
    payer: {
      email: req.body.email,
      identification: {
        type: req.body.identificationType,
        number: req.body.number,
      }
    }
  };
  

  payment.create({body,requestOptions})
  .then(console.log)
  .catch(console.log)

  res.send("OK");
});

module.exports = router;
