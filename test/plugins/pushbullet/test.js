var server = require('../../../lib/server.js');
var request = require('request');
var chai = require('chai');
var expect = chai.expect;

describe('Pushbullet Plugin', function () {
  before(function () {
    server.listen(8000);
  });

  it('should return 200', function (done) {
    var options = {
      url: 'http://localhost:8000/kerberosio',
      headers: {
        'Content-Type': 'text/plain'
      }
    };
    request.get(options, function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.equal('GET call for PushuBullet is not supported. Use POST instead');
      done();
    });
  });

  after(function () {
    server.close();
  });
});
