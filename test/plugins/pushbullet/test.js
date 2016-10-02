var server = require('../../../lib/server.js');
var request = require('request');
var chai = require('chai');
var expect = chai.expect;
var _ = require('underscore');

var options = {
  url: 'http://localhost:8000/pushbullet',
  headers: {
    'Content-Type': 'text/plain'
  }
};

describe('Pushbullet Plugin', function () {
  before(function () {
    server.listen(8000);
  });

  it('GET Method should return 200', function (done) {
    request.get(options, function (err, res, body) {
      if (err) {
        throw new Error(error);
      }
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.equal('GET call for PushuBullet is not supported. Use POST instead');
      done();
    });
  });

  it('POST Method should return 200', function (done) {
    var testOptions = {
      method: 'POST',
      json: {"regionCoordinates":[555,438,578,476],"numberOfChanges":26,"timestamp":"1474833997","microseconds":"6-875999","token":994,"pathToImage":"1474915896_6-808694_home_regionCoordinates_numberOfChanges_268.jpg","instanceName":"home"}
    };
    var postOptions = _.extend(options, testOptions);
    request(postOptions, function (err, res, body) {
      if (err) {
        console.log(err);
      }
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.equal('Call to Pushbullet sent');
      done();
    });
  });

  after(function () {
    server.close();
  });
});
