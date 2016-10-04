var server = require('../lib/server.js');
var request = require('request');
var chai = require('chai');
var expect = chai.expect;

var options = {
  url: 'http://localhost:8000',
  headers: {
    'Content-Type': 'text/plain'
  }
};

describe('Base Server', function () {
  before(function () {
    server.listen(8000);
  });

  it('should return 404', function (done) {
    request.get(options, function (err, res, body) {
      expect(res.statusCode).to.equal(404);
      expect(res.body).to.equal('');
      done();
    });
  });

  it('GET Method should return 200', function (done) {
    options.url = options.url + '/kerberosio';
    request.get(options, function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      //Working in this way 'cause we have just 1 plugin activate
      expect(res.body).to.equal('GET call for PushBullet is not supported. Use POST instead');
      done();
    });
  });

  after(function () {
    server.close();
  });
});

require('mocha-jshint')({
    git: {
        modified: true,
        commits: 2,
        exec: {
            maxBuffer: 20*1024*1024
        }
    },
    pretty: true,
    paths: [
        'index.js',
        'test/*.js',
        'test/**/*.js',
        'plugins/*.js',
        'plugins/**/*.js',
        'config/*.js',
        'lib/*.js'
    ]
});
