var fs = require("fs")
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

const jwt = require('jsonwebtoken');
const secret = process.env.AUTH_SECRET || 'secret';

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


function passwordReset(obj) {

  const token = jwt.sign({uid:obj.id, action:'password_reset'},secret)

    var modelEmail = fs.readFileSync("./src/mailmodel/passwordReset.html", 'utf8', function (err, data) {
    if (err) console.log(err);
    return data
  })

  var datatemplate = `<a style="padding:0.5em; display:inline-block; text-decoration:none; background-color: #00cc76; color:#ffffff; margin:.5em; border-radius:.5em;"href='http://localhost:3000/reset?token=${token}'> CAMBIAR</a>`
  modelEmail = modelEmail.replace("%username%",obj.name.toUpperCase());
  modelEmail = modelEmail.replace("%resetlink%",datatemplate)


  nodemailerMailgun.sendMail({
    from: 'gardenRy@gardenRy.com',
    to: obj.email,
    subject: 'Cambio de contraseña',
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
  passwordReset
}