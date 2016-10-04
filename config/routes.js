var config = require('config');

var pluginsFolder = '../plugins/';

var routes = {"GET": {}, "POST": {}};
var globalMethods = {"GET": [], "POST": []};
console.log("Configuring " + config.activated_plugins.length + " plugins...");
for (var i=0; i<config.activated_plugins.length; i++) {
  var current_module_config_file = require(pluginsFolder + config.activated_plugins[i] + "/config.js");
  var current_module_config = new current_module_config_file();
  if (current_module_config.getName() === undefined) {
    console.error('Plugin ' + config.activated_plugins[i] + ' not correctly configured');
    continue;
  }
  var current_module_routes_file = require(pluginsFolder + config.activated_plugins[i] + "/routes.js");
  var current_module = new current_module_routes_file();

  routes.GET[current_module.getUrl()] = current_module.getGetCode();
  routes.POST[current_module.getUrl()] = current_module.getPostCode();

  globalMethods.GET.push(current_module.getGetCode());
  globalMethods.POST.push(current_module.getPostCode());
}

//Adding base path to call all active plugins
function callActiveMethods(method, req, res) {
  for (var i=0; i<globalMethods[method].length; i++) {
    globalMethods[method][i](req, res);
  }
}

function callAllActivetGet(req, res) {
  callActiveMethods("GET", req, res);
}

function callAllActivetPost(req, res) {
  callActiveMethods("POST", req, res);
}

routes.GET[config.server_main_path] = callAllActivetGet;
routes.POST[config.server_main_path] = callAllActivetPost;

module.exports.routes = routes;
