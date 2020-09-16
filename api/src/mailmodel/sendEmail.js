var fs = require("fs")
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var auth = {
  auth: {
    api_key: 'e6eb8d555aea984a6fd6862022d21273-d5e69b0b-88b0f856',
    domain: 'sandbox693866aa224c4dc0ac01b02fb995b793.mailgun.org'
  }
}
var nodemailerMailgun = nodemailer.createTransport(mg(auth));



function sendEmail(obj) {
  console.log(obj.id)
  console.log(obj.user.name)

  var modelEmail = fs.readFileSync("./src/mailmodel/index.html", 'utf8', function (err, data) {
    if (err) console.log(err);
    return data
  })

  var dataTemplate = obj.products.reduce(function (acc, current) {
    return `${acc}<a class="imagen" href="http://localhost:3000/products/${current.id}" style="display: inline-grid;margin: .5em 1em; text-decoration: none; color:#000000;font-weight: 600;">
        <p style="margin-bottom: .5em; text-transform: capitalize;">${current.name}</p>
        <img  style="height: 8em; width: 8em; border-radius: 50%; border: #00cc76 solid .2em;" src='${current.images[0].url}'/>
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