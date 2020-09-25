var fs = require("fs")
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
const {
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN
} = process.env;



var auth = {
  auth: {
    api_key: MAILGUN_API_KEY,
    domain: MAILGUN_DOMAIN
  }
}
var nodemailerMailgun = nodemailer.createTransport(mg(auth));



function sendEmail(obj) {
  var modelEmail = fs.readFileSync("./src/mailmodel/index.html", 'utf8', function (err, data) {
    if (err) console.log(err);
    return data
  })

  var dataTemplate = obj.products.reduce(function (acc, current) {
    console.log(current.images)
    return `${acc}<a class="imagen" href="${process.env.CALLBACK_URL_BASE || 'http://localhost:3000'}/products/${current.id}" style="display: inline-grid;margin: .5em 1em; text-decoration: none; color:#000000;font-weight: 600;">
    <p style="margin-bottom: .5em; text-transform: capitalize;">${current.name}</p>
    <img  style="height: 8em; width: 8em; border-radius: 50%; border: #00cc76 solid .2em;" src='${current.images[0] ? current.images[0].url : 'data:image/jpeg;base64,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'}'/>
    <p style="display: block;margin: .5em;">$ ${current.price}</p>
    <p style="display: block;margin: .25em;">Cantidad: ${current.order_product.amount}</p> 
        </a>`
  }, "<div>")
  dataTemplate += "</div>"
  modelEmail = modelEmail.replace("%listProducts%", dataTemplate)
  modelEmail = modelEmail.replace("%address%", obj.address.toUpperCase())
  modelEmail = modelEmail.replace("%username%", obj.user.name.toUpperCase())
  modelEmail = modelEmail.replace("%orderid%", obj.id)
  nodemailerMailgun.sendMail({
    from: 'gardenRy@gardenRy.com',
    to: obj.user.email, // An array if you have multiple recipients.
    subject: 'Confirmamos tu compra!',
    html: modelEmail
  }, function (err, info) {
    if (err) {
      console.log('Error: ' + err);
    } else {
      console.log('Response: ' + info);
    }
  });

  return modelEmail;
}
module.exports = {
  sendEmail
}