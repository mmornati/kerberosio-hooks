var config = require('./config.json');

function overrideConfiguration(newConfiguration) {
  config = newConfiguration;
}

module.exports.config = config;
module.exports.setConfig = overrideConfiguration;
