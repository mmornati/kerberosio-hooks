var abstractConfig = require('../config');
function define(name, value) {
  Object.defineProperty(exports, name, {
      value:      value,
      enumerable: true
  });
}

var pluginConfig = Object.create(abstractConfig.configPrototype);
pluginConfig.name = "PushuBullet";

define('KEY', 'test');
define('BASE_URL', 'https://yourserver.net/');

module.exports.pluginConfig = pluginConfig;
