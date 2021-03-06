var _ = require('underscore');
var config = require('config');
var pluginConfig = require('./config');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var EmailConfig = new pluginConfig();

var transporter = nodemailer.createTransport(EmailConfig.getPluginConfig().smtp_config);

function getMethod(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('GET call for ' + EmailConfig.getName() + ' is not supported. Use POST instead');
}

function postMethod(req,res) {
  var receivedData = JSON.parse(req.body);
  var data = EmailConfig.getPluginConfig().data;
  var image_to_send = EmailConfig.getImageUrl(config, receivedData.pathToImage);

  data.attachments = [];
  data.attachments.push({
      filename: receivedData.pathToImage,
      path: image_to_send
  });
  transporter.sendMail(data, function(err, info) {
    if (err) {
      console.log(err);
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end("Error sending the email");
    } else {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Email sent OK');
    }
  });
}

module.exports.get = getMethod;
module.exports.post = postMethod;
