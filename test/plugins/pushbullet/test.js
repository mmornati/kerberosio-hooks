var server = require('../../../lib/server.js');
var config = require('config');
var request = require('request');
var chai = require('chai');
var expect = chai.expect;
var _ = require('underscore');
var sinon = require('sinon');
var PushBullet = require('pushbullet');

var devicesjson = require('./devices.json');
var sendfilejson = require('./sendfile.json');

var options = {
  url: 'http://localhost:8000/pushbullet',
  headers: {
    'Content-Type': 'text/plain'
  }
};

var testOptions = {
  method: 'POST',
  json: {"regionCoordinates":[555,438,578,476],"numberOfChanges":26,"timestamp":"1474833997","microseconds":"6-875999","token":994,"pathToImage":"testimage.jpg","instanceName":"home"}
};

var devicesStub;
var filesStub;
var noteStub;

describe('Pushbullet Plugin', function () {
  beforeEach(function () {
    devicesStub = sinon.stub(PushBullet.prototype, 'devices').yields(null, devicesjson);
    filesStub = sinon.stub(PushBullet.prototype, 'file').yields(null, sendfilejson);
    noteStub = sinon.stub(PushBullet.prototype, 'note');

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

  it('POST Method 2 devices OK', function (done) {
    var postOptions = _.extend(options, testOptions);
    request(postOptions, function (err, res, body) {
      if (err) {
        console.log(err);
      }
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.equal('Call to Pushbullet sent');
      sinon.assert.calledOnce(devicesStub);
      sinon.assert.calledTwice(filesStub);
      sinon.assert.calledWith(filesStub, "ABC", config.images_base_path + "testimage.jpg", 'Kerberos.io Motion Image');
      sinon.assert.calledWith(filesStub, "DEF", config.images_base_path + "testimage.jpg", 'Kerberos.io Motion Image');
      sinon.assert.calledTwice(noteStub);
      sinon.assert.calledWith(noteStub, "ABC", "WARNING: Kerberos.io Motion Detected");
      sinon.assert.calledWith(noteStub, "DEF", "WARNING: Kerberos.io Motion Detected");
      done();
    });
  });

  it('POST Method 1 device OK', function (done) {

    config.device_id = "123";

    var postOptions = _.extend(options, testOptions);
    request(postOptions, function (err, res, body) {
      if (err) {
        console.log(err);
      }
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.equal('Call to Pushbullet sent');
      sinon.assert.callCount(devicesStub, 0);
      sinon.assert.calledOnce(filesStub);
      sinon.assert.calledWith(filesStub, "123", config.images_base_path + "testimage.jpg", 'Kerberos.io Motion Image');
      sinon.assert.calledOnce(noteStub);
      sinon.assert.calledWith(noteStub, "123", "WARNING: Kerberos.io Motion Detected");
      done();
    });
  });

  it('POST Method 1 device with URL image OK', function (done) {

    config.device_id = "123";
    config.image_method = 'URL';
    config.images_base_url = 'https://localhost';

    var postOptions = _.extend(options, testOptions);
    request(postOptions, function (err, res, body) {
      if (err) {
        console.log(err);
      }
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.equal('Call to Pushbullet sent');
      sinon.assert.calledOnce(filesStub);
      sinon.assert.calledWith(filesStub, "123", config.images_base_url + "testimage.jpg", 'Kerberos.io Motion Image');
      done();
    });
  });

  afterEach(function () {
    devicesStub.restore();
    filesStub.restore();
    noteStub.restore();
    server.close();
  });
});
