var plugin = require('./index');

var routes = [
  {
    "url": "/pushbullet",
    "type": "GET",
    "code": plugin.get
  },
  {
    "url": "/pushbullet",
    "type": "POST",
    "code": plugin.post
  },
];

module.exports.routes = routes;
