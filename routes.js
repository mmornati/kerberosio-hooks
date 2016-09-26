var config = require('./config');

var routes = {"GET": {}, "POST": {}};

console.log("routesuring " + config.activated_plugins.length + " plugins...");
for (var i=0; i<config.activated_plugins.length; i++) {
  var current_module = require('./plugins/' + config.activated_plugins[i] + "/routes.js");
  for (var j=0; j<current_module.routes.length; j++) {
    if (routes[current_module.routes[j].type] != undefined) {
        routes[current_module.routes[j].type][current_module.routes[j].url] = current_module.routes[j].code;
    } else {
      console.log("Unsupported method " + current_module.routes[j].type + "for module " + activated_plugins[i]);
    }
  }
}

module.exports.routes = routes;
