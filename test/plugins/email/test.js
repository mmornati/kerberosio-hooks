var server = require('../../../lib/server.js');
var _ = require('underscore');
var config = require('config');
var request = require('request');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var nodemailer = require('nodemailer');

var options = {
  url: 'http://localhost:8000/email',
  headers: {
    'Content-Type': 'text/plain'
  }
};

describe('Email Plugin', function () {
  beforeEach(function () {
    var emailStub = sinon.stub(nodemailer.prototype, 'createTransport');
    server.listen(8000);
  });

  it('GET Method should return 200', function (done) {
    request.get(options, function (err, res, body) {
      if (err) {
        throw new Error(error);
      }
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.equal('GET call for Email is not supported. Use POST instead');
      done();
    });
  });

  it('POST Method mail sent OK', function (done) {
    var testOptions = {
      method: 'POST',
      json: {"regionCoordinates":[555,438,578,476],"numberOfChanges":26,"timestamp":"1474833997","microseconds":"6-875999","token":994,"pathToImage":"testimage.jpg","instanceName":"home"}
    };
    var postOptions = _.extend(options, testOptions);
    request(postOptions, function (err, res, body) {
      if (err) {
        console.log(err);
      }
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.equal('Email sent OK');
      done();
    });
  });


  afterEach(function () {
    server.close();
  });
});
