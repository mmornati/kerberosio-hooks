var plugin = require('./index');

var routes = [
  {
    "url": "/kerberosio",
    "type": "GET",
    "code": plugin.get
  },
  {
    "url": "/kerberosio",
    "type": "POST",
    "code": plugin.post
  },
]

module.exports.routes = routes;
