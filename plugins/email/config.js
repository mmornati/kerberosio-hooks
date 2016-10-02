var AbstractConfiguration = require('../config');
var config = require('config');

class EmailConfig extends AbstractConfiguration {

  constructor() {
    super("Email");
  }

  getPluginConfig() {
    return config.plugins.email;
  }

}

module.exports = EmailConfig;
