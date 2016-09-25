//Lets require/import the HTTP module
var http = require('http');
var PushBullet = require('pushbullet');
var pusher = new PushBullet('your-key');
var dispatcher = require('httpdispatcher');
var moment = require('moment');

//Lets define a port we want to listen to
const PORT=8080;

const BASE_URL="https://yourserver.net/"

//We need a function which handles requests and send response
function handleRequest(request, response){
    try {
        //log the request on console
        console.log(request.method + " on " + request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

dispatcher.onGet("/kerberosio", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Get Hook');
});    

//A sample POST request
dispatcher.onPost("/kerberosio", function(req, res) {
    console.log(req.body);
    pusher.devices(function(error, response) {
       var devices = response.devices;
       devices.forEach(function(device) {
           var receivedData = JSON.parse(req.body);
           var message = "Motion detected at home! " + moment.unix(receivedData.timestamp).format("MM/DD/YYYY") + " Check it here " + BASE_URL + receivedData.pathToImage;
           pusher.note(device.device_iden, "Kerberos.io: Motion Detected", message);
       });
    });
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Got Post Data');
});

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
