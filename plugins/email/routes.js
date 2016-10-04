var plugin = require('./index');
var AbstractRoutes = require('../routes');

class EmailRoutes extends AbstractRoutes {

  constructor() {
    super('/email', plugin.get, plugin.post);
  }

}

module.exports = EmailRoutes;
