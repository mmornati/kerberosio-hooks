var server = require('./lib/server');
var settings = require('./conf/config');

//Lets start our server
server.listen(settings.config.server_port, function(){
    console.log("Server listening on: http://localhost:%s", settings.config.server_port);
});
