var settings = require('./config');

var pluginsFolder = '../plugins/';

var routes = {"GET": {}, "POST": {}};
var globalMethods = {"GET": [], "POST": []};
console.log("Configuring " + settings.config.activated_plugins.length + " plugins...");
for (var i=0; i<settings.config.activated_plugins.length; i++) {
  var current_module_config = require(pluginsFolder + settings.config.activated_plugins[i] + "/config.js");
  if (current_module_config.pluginConfig.name === undefined) {
    console.error('Plugin ' + settings.config.activated_plugins[i] + ' not correctly configured');
    continue;
  }
  var current_module = require(pluginsFolder + settings.config.activated_plugins[i] + "/routes.js");
  if (current_module === undefined || current_module.routes === undefined) {
    throw new Error('Missing routes for ' + settings.config.activated_plugins[i] + ' plugin');
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

routes.GET[settings.config.server_main_path] = callAllActivetGet;
routes.POST[settings.config.server_main_path] = callAllActivetPost;

module.exports.routes = routes;
