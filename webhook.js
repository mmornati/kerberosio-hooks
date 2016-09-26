//Lets require/import the HTTP module
var http = require('http');
var dispatcher = require('httpdispatcher');
var routes = require('./routes');

//Lets define a port we want to listen to
const PORT=8080;

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


//GET Methods
var get_array = routes.routes["GET"];
for (var key in get_array) {
  if (!get_array.hasOwnProperty(key)) {
    continue;
  }
  dispatcher.onGet(key, function(req, res) {
      get_array[key](req, res);
  });
}

//POST Methods
var post_array = routes.routes["POST"];
for (var key in get_array) {
  if (!get_array.hasOwnProperty(key)) {
    continue;
  }
  dispatcher.onPost(key, function(req, res) {
      post_array[key](req, res);
  });
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
