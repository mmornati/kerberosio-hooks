var _ = require('underscore');
var config = require('config');
var pluginConfig = require('./config');
var PushBullet = require('pushbullet');
var pusher = new PushBullet(config.pushbullet_key);
var moment = require('moment');

var PushBulletConfig = new pluginConfig();

function getMethod(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('GET call for ' + PushBulletConfig.getName() + ' is not supported. Use POST instead');
}

function postMethod(req,res) {
  if (config.device_id !== undefined && config.device_id !== "") {
    sendMessage(req.body, config.device_id);
  } else {
    pusher.devices(function(error, response) {
      console.log("No device provided. Sending to all defined devices.");
      var devices = response.devices;
      devices.forEach(function(device) {
        if (device.active) {
          console.log("Sending notification to " + device.nickname);
          sendMessage(req.body, device.iden);
        }
      });
    });
  }
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Call to Pushbullet sent');
}

function sendMessage(data, device_id) {
  var receivedData = JSON.parse(data);
  var message = "Motion detected at home! " + moment.unix(receivedData.timestamp).format("MM/DD/YYYY");
  pusher.note(device_id, "WARNING: Kerberos.io Motion Detected", message);
  var image_to_send;
  if (config.image_method == 'URL') {
    image_to_send = config.images_base_url + receivedData.pathToImage;
  } else if (config.image_method == 'PATH') {
    image_to_send = config.images_base_path + receivedData.pathToImage;
  }
  pusher.file(device_id, image_to_send, 'Kerberos.io Motion Image', function(error, response) {
    if (response !== undefined) {
      return {'statusCode': 200, 'message':response};
    } else if (error !== undefined) {
      console.log(error);
      return {'statusCode': 500, 'message': error};
    }
  });
}

module.exports.get = getMethod;
module.exports.post = postMethod;
