var config = require('./config.json');

var pluginsFolder = '../plugins/';

var routes = {"GET": {}, "POST": {}};
var globalMethods = {"GET": [], "POST": []};
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
        globalMethods[current_module.routes[j].type].push(current_module.routes[j].code);
    } else {
      console.log("Unsupported method " + current_module.routes[j].type + "for module " + activated_plugins[i]);
    }
  }
}

//Adding base path to call all active plugins
function callAllActivetGet(req, res) {
    for (var i=0; i<globalMethods.GET.length; i++) {
      globalMethods.GET[i](req, res);
    }
}

function callAllActivetPost(req, res) {
    for (var i=0; i<globalMethods.POST.length; i++) {
      globalMethods.POST[i](req, res);
    }
}

routes.GET[config.server_main_path] = callAllActivetGet;
routes.POST[config.server_main_path] = callAllActivetPost;

module.exports.routes = routes;
