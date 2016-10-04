var AbstractConfiguration = require('../config');
var config = require('config');

class PushBulletConfig extends AbstractConfiguration {

  constructor() {
    super("PushBullet");
  }

  getPluginConfig() {
    return config.plugins.pushbullet;
  }

}

module.exports = PushBulletConfig;
