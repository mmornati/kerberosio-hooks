var server = require('../../../lib/server.js');
var _ = require('underscore');
var config = require('config');
var request = require('request');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var nodemailer = require('nodemailer');
var SMTPServer = require('smtp-server').SMTPServer;
var crypto = require('crypto');

var options = {
  url: 'http://localhost:8000/email',
  headers: {
    'Content-Type': 'text/plain'
  }
};

var nmtransport, emailStub;
var smtpServer;

function manageAddValidation(regex, address, session, callback) {
    var re = new RegExp(regex);
    if (!re.test(address.address)) {
        return callback(new Error('Only ' + regex + ' is allowed.'));
    }
    return callback(); // Accept the address
}

describe('Email Plugin', function () {
  beforeEach(function (done) {
    smtpServer = new SMTPServer({
        authMethods: ['PLAIN', 'XOAUTH2'],
        disabledCommands: ['STARTTLS'],

        onData: function (stream, session, callback) {
          var hash = crypto.createHash('md5');
          stream.on('data', function (chunk) {
              hash.update(chunk);
          });
          stream.on('end', function () {
              callback(null, hash.digest('hex'));
          });
        },

        onAuth: function (auth, session, callback) {
            if (auth.username !== 'testuser' || auth.password !== 'testpass') {
                return callback(null, {
                    data: {
                        status: '401',
                        schemes: 'bearer mac',
                        scope: 'my_smtp_access_scope_name'
                    }
                });
            }
            callback(null, {
                user: 123
            });
        },
        onMailFrom: function (address, session, callback) {
          return manageAddValidation("@valid.sender", address, session, callback);
        },
        onRcptTo: function (address, session, callback) {
          return manageAddValidation("@valid.recipient", address, session, callback);
        },
        logger: false
    });

    smtpServer.listen(8010, done);
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
      json: {"regionCoordinates":[555,438,578,476],"numberOfChanges":26,"timestamp":"1474833997","microseconds":"6-875999","token":994,"pathToImage":"testimage.png","instanceName":"home"}
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


  afterEach(function (done) {
    smtpServer.close(done);
    server.close();
  });
});
