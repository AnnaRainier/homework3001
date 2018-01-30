var express = require('express');
var app = express();
var hbs = require('hbs');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anniekhrystiuk@gmail.com',
    pass: 'ThatAccountIsFake180117'
  }
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/about', function (req, res) {
  res.render('about', {
    information: {
      country: 'Africa',
      foundationDate: new Date(),
      founder: 'Lemur'
    }
  });
});

app.get('/contact', function (req, res) {
  res.render('contact');
})

app.post('/feedback', function (req, res) {
  res.render('feedback');
  var mailOptions = {
    from: 'anniekhrystiuk@gmail.com',
    to: 'annarainier11@gmail.com',
    subject: 'Sending mail using nodeJS',
    text: req.body.message,
  };
  transporter.sendMail (mailOptions, function (err, info) {
  if (err) {
    console.log('error');
  } else {
    console.log('мейл отправлен ' + info.response);
  }
});
})

app.listen(3000, function () {
  console.log('server is up on port 3000');
})
