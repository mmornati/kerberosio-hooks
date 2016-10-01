var config = require('./config');

var pluginsFolder = '../plugins/';

var routes = {"GET": {}, "POST": {}};
console.log("Configuring " + config.activated_plugins.length + " plugins...");
for (var i=0; i<config.activated_plugins.length; i++) {
  var current_module_config = require(pluginsFolder + config.activated_plugins[i] + "/config.js");
  if (current_module_config.pluginConfig.name === undefined) {
    console.error('Plugin ' + config.activated_plugins[i] + ' not correctly configured');
    continue;
  }
  var current_module = require(pluginsFolder + config.activated_plugins[i] + "/routes.js");
  if (current_module === undefined || current_module.routes === undefined) {
    throw new Error('Missing routes for ' + config.activated_plugins[i] + ' plugin');
  }
  for (var j=0; j<current_module.routes.length; j++) {
    if (routes[current_module.routes[j].type] !== undefined) {
        routes[current_module.routes[j].type][current_module.routes[j].url] = current_module.routes[j].code;
    } else {
      console.log("Unsupported method " + current_module.routes[j].type + "for module " + activated_plugins[i]);
    }
  }
}

module.exports.routes = routes;
