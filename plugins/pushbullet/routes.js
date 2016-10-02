var plugin = require('./index');
var AbstractRoutes = require('../routes');

class PushBulletRoutes extends AbstractRoutes {

  constructor() {
    super('/pushbullet', plugin.get, plugin.post);
  }

}

module.exports = PushBulletRoutes;
