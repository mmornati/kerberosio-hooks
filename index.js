var server = require('./lib/server');
var config = require('config');

//Lets start our server
server.listen(config.server_port, function(){
    console.log("Server listening on: http://localhost:%s", config.server_port);
});
