var abstractConfig = require('../config');

var pluginConfig = Object.create(abstractConfig.configPrototype);
pluginConfig.name = "PushuBullet";

module.exports.pluginConfig = pluginConfig;
