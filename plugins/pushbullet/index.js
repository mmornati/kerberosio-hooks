var config = require('./config');
var PushBullet = require('pushbullet');
var pusher = new PushBullet(config.KEY);
var moment = require('moment');


function getMethod(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('GET call for ' + config.pluginConfig.name + ' is not supported. Use POST instead');
}

function postMethod(req,res) {
  pusher.devices(function(error, response) {
    if (config.DEVICE_ID != undefined) {
      sendMessage(req.body, config.DEVICE_ID);
    } else {
      console.log("No device provided. Sending to all defined devices.")
      var devices = response.devices;
      devices.forEach(function(device) {
        if (device.active) {
          console.log("Sending notification to " + device.nickname);
          sendMessage(req.body, device.device_iden)
        }
      });
    }
  });
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Call to Pushbullet sent');
}

function sendMessage(data, device_id) {
  var receivedData = JSON.parse(data);
  var message = "Motion detected at home! " + moment.unix(receivedData.timestamp).format("MM/DD/YYYY");
  pusher.note(device_id, "WARNING: Kerberos.io Motion Detected", message);
  var image_to_send;
  if (config.IMAGE_METHOD == 'URL') {
    image_to_send = config.IMAGES_BASE_URL + receivedData.pathToImage;
  } else if (config.IMAGE_METHOD == 'PATH') {
    image_to_send = config.IMAGES_BASE_PATH + receivedData.pathToImage;
  }
  pusher.file(device_id, image_to_send, 'Kerberos.io Motion Image', function(error, response) {
    if (response != undefined) {
      console.log(response.file_url);
      console.log(response.image_url);
    } else if (error != undefined) {
      console.log(error);
    }
  });
}

module.exports.get = getMethod;
module.exports.post = postMethod;
