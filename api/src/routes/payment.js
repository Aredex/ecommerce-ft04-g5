const mercadopago = require('mercadopago');
const { confirmedOrder, getOne } = require('../controllers/orders');

const router = require("express").Router();

// Agrega credenciales
mercadopago.configure({
  sandbox: true,
  access_token: process.env.MELI_ACCESS_TOKEN,
});

// Crea un objeto de preferencia
let preference = {
  items: [
    {
      title: 'Mi producto',
      unit_price: 100,
      quantity: 1,
    }
  ],
  payment_methods: {
    excluded_payment_types: [
      {
        id: "ticket"
      },
      {
        id: "atm"
      }
    ],
    installments: 1
  },
  back_urls: {
    success: "http://localhost:3001/payment/meli/callback",
    failure: "http://localhost:3001/payment/meli/callback",
  },
  auto_return: "approved",
};

router.route('/meli/callback').get(async (req, res) => {
  if (req.query.collection_status !== 'null') {
    try {
      const { body } = await mercadopago.payment.get(req.query.collection_id)
      await confirmedOrder({
        id: req.query.external_reference,
        payment_method_id: body.payment_method_id,
        payment_type_id: body.payment_type_id,
        payment_status: body.status,
        payment_status_detail: body.status_detail,
        card_expiration_month: body.card.expiration_month,
        card_expiration_year: body.card.expiration_year,
        card_first_six_digits: body.card.first_six_digits,
        card_last_four_digits: body.card.last_four_digits
      })
      res.redirect('http://localhost:3000/checkout/success')
    } catch (error) {
      res.status(200).json(error)
    }
  } else {
    res.redirect(`http://localhost:3000/checkout/cancel?order=${req.query.external_reference}`)
  }
})
module.exports = router;