var config = require('./config');
console.log(config);
var PushBullet = require('pushbullet');
var pusher = new PushBullet(config.KEY);
var moment = require('moment');


function getMethod(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Get Hook');
}

function postMethod(req,res) {
  console.log(req.body);
  pusher.devices(function(error, response) {
     var devices = response.devices;
     devices.forEach(function(device) {
         var receivedData = JSON.parse(req.body);
         var message = "Motion detected at home! " + moment.unix(receivedData.timestamp).format("MM/DD/YYYY") + " Check it here " + config.BASE_URL + receivedData.pathToImage;
         pusher.note(device.device_iden, "Kerberos.io: Motion Detected", message);
     });
  });
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Got Post Data');
}

module.exports.get = getMethod;
module.exports.post = postMethod;
