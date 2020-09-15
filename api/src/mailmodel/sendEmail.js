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

var modelEmail = fs.readFileSync("./src/mailmodel/index.html", 'utf8', function (err, data) {
  if (err) console.log(err);
  return data
})

function sendEmail(obj) {
  console.log("entro")
  console.log(obj)

  var dataTemplate = obj.products.reduce(function (acc, current) {
    return `${acc}<div style="display: inline-grid;margin: 1em 1em;">
        <label>${current.name}</label>
        <img style="height: 3em; width: 3em;" src='${current.img}'/>
        <p style="display: block;">$ ${current.price}</p>
        <p style="display: block;">Cantidad: ${current.order_product.amount}</p> 
        </div>`
  }, "<div>")
  dataTemplate += "</div>"
  modelEmail = modelEmail.replace("%listProducts%", dataTemplate)

  modelEmail = modelEmail.replace("%address%", obj.address)

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

}
module.exports = {
  sendEmail
}