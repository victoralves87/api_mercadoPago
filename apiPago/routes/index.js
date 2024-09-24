const {MercadoPagoConfig,Payment} = require ('mercadopago')

// Step 2:  the client object
const client = new MercadoPagoConfig(
  {
    accessToken: '',
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

  const requestOptions = {
    idempotencyKey: require('crypto').randomBytes(16).toString('hex')
  };
  
  

  payment.create({ body, requestOptions })
  .then((result) => {
    // Retorna o QR code para o frontend
    res.json({
      qrCode: result.point_of_interaction.transaction_data.qr_code_base64
    });
  })
  .catch((error) => {
    console.error("error", error);
    res.status(500).json({ error: 'Erro ao gerar o QR code.' });
  });
});

module.exports = router;
