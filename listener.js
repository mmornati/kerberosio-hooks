// Import libraries
var net = require('net');
var PushBullet = require('pushbullet');
var pusher = new PushBullet('your-key');
require('date-utils');
// Variables
var listenerPort = 1337;
var time1 = new Date();
net.createServer(function (socket) {
    // Handle incoming messages from the magnet controller.
    socket.once('data', function (data) {
        var time2 = new Date();
        var timeBetween = time1.getSecondsBetween(time2);
        if(timeBetween > 30) {
            pusher.devices(function(error, response) {
                var devices = response.devices;
                devices.forEach(function(device) {
                    pusher.note(device.device_iden, "Kerberos.io: " + data.toString(), data.toString());
                });
            });
        }
        time1 = time2;
    });
}).listen(listenerPort);
// Put a friendly message on the terminal of the server.
console.log("Kerberos.io listener running at port 1337\n");
