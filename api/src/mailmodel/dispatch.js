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



function dispatch(obj) {

  var modelEmail = fs.readFileSync("./src/mailmodel/dispatch.html", 'utf8', function (err, data) {
    if (err) console.error(err);
    return data
  })

  var dataTemplate = obj.products.reduce(function (acc, current) {
    var imagen = current.images[0] ? current.images[0].url : 'https://cdn.iconscout.com/icon/free/png-256/no-image-1771002-1505134.png'
    return `${acc}<a class="imagen" href="${process.env.CALLBACK_URL_BASE || 'http://localhost:3000'}/products/${current.id}" style="display:block;margin: .5em 1em; grid-auto-columns: 100%;text-decoration: none; color:#000000;font-weight: 600;">
        <p style="margin-bottom: .5em; text-transform: capitalize;">${current.name}</p>
        <img  style="height: 8em; width: 8em; border-radius: 50%; border: #00cc76 solid .2em;" src='${imagen}'/>
        <p style="display: block;margin: .5em;">${current.description}</p>
        </a>`
  }, "<div>")
  dataTemplate += "</div>"
  modelEmail = modelEmail.replace("%listProducts%", dataTemplate)
  modelEmail = modelEmail.replace("%address%", obj.address.toUpperCase())
  modelEmail = modelEmail.replace("%username%", obj.user.name.toUpperCase())
  modelEmail = modelEmail.replace("%orderid%", obj.id)
  modelEmail = modelEmail.replace("%name%", obj.user.name.toUpperCase())
  modelEmail = modelEmail.replace("%order%", obj.id)

  nodemailerMailgun.sendMail({
    from: 'gardenRy@gardenRy.com',
    to: obj.user.email,
    subject: 'Enviamos tu pedido!',
    html: modelEmail
  }, function (err, info) {
    if (err) {
      console.error('Error: ' + err);
    } else {
      console.info('Response: ' + info);
    }
  });

  return modelEmail;
}
module.exports = {
  dispatch
}