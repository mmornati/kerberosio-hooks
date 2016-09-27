var abstractConfig = require('../config');
function define(name, value) {
  Object.defineProperty(exports, name, {
      value:      value,
      enumerable: true
  });
}

var pluginConfig = Object.create(abstractConfig.configPrototype);
pluginConfig.name = "PushuBullet";

//Push Bullet API KEY
define('KEY', 'test');
//Push Bullet target Device ID. If Undefined the message will be sent to all
//pushbullet configured devices.
define('DEVICE_ID', undefined);
//URL exposing kerberos.io images
define('IMAGES_BASE_URL', 'https://media.home.mornati.net/');
define('IMAGES_BASE_PATH', '/mnt/kerberosio/machinery/capture/');
//How to send image via pushbullet. Allowed values PATH/URL
define('IMAGE_METHOD', 'PATH');


module.exports.pluginConfig = pluginConfig;
