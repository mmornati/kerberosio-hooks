//Lets require/import the HTTP module
var http = require('http');
var httpdispatcher = require('httpdispatcher');
var routes = require('../config/routes');

var dispatcher = new httpdispatcher();


//Lets define a port we want to listen to
const PORT=8080;

//We need a function which handles requests and send response
function handleRequest(request, response){
    try {
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

function getDefineCallback(dispatcher, key, funct) {
  dispatcher.onGet(key, function(req, res) {
    funct(req, res);
  });
}

function postDefineCallback(dispatcher, key, funct) {
  dispatcher.onPost(key, function(req, res) {
    funct(req, res);
  });
}

//GET Methods
var get_array = routes.routes.GET;
for (var key in get_array) {
  if (!get_array.hasOwnProperty(key)) {
    continue;
  }
  getDefineCallback(dispatcher, key, get_array[key]);
}

//POST Methods
var post_array = routes.routes.POST;
for (var key in post_array) {
  if (!post_array.hasOwnProperty(key)) {
    continue;
  }
  postDefineCallback(dispatcher, key, post_array[key]);
}

//Create a server
var server = module.exports = http.createServer(handleRequest);
