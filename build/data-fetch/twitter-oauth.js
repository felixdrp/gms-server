'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _oauth = require('../oauth/oauth');

var _oauth2 = _interopRequireDefault(_oauth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Module to Facade the data fetch from server and client.
 *
 *
 * Example usage:
 * ```

 *
 * ```
 */

var TwitterOAuth = function () {
  function TwitterOAuth() {
    var _this = this;

    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, TwitterOAuth);

    _initialiseProps.call(this);

    this.optionsBase = {
      host: 'api.twitter.com',
      port: 443,
      method: 'POST'
    };

    this.customerSecret = data.customerSecret || '';
    this.consumerKey = data.consumerKey || '';
    this.oauth_token = null;
    this.accessTokenSecret = null;
    this.oauth_callback = 'http://127.0.0.1:8009/';
    // this.oauth_callback = encodeURIComponent('http://localhost:8009/');

    this.optionsRequestToken = function (data) {
      var header = data.header;
      var auth = 'OAuth oauth_consumer_key="' + header.oauth_consumer_key + '", ' + 'oauth_nonce="' + header.oauth_nonce + '", ' + 'oauth_signature="' + header.oauth_signature + '", ' + 'oauth_callback="' + encodeURIComponent(_this.oauth_callback) + '", ' + 'oauth_signature_method="HMAC-SHA1", oauth_timestamp="' + header.oauth_timestamp + '", oauth_version="1.0"';
      return (0, _extends3.default)({}, _this.optionsBase, {
        path: '/oauth/request_token',
        headers: {
          'Authorization': auth
        }
      });
    };

    this.options_other = function (authorization) {
      var auth = authorization || 'OAuth oauth_consumer_key="AntPzHq9fsnTPbbaP0nrwngJt", oauth_nonce="69e3594f96e53f1a23bd8e5cea3cb0fc", oauth_signature="puHy3%2BFnuOJqRTveYcv8pQWzn%2BM%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1458429951", oauth_version="1.0"';
      return (0, _extends3.default)({}, _this.optionsBase, {
        method: 'GET',
        path: '/oauth/authenticate',
        headers: {
          'Authorization': auth
        }
      });
    };
  }

  (0, _createClass3.default)(TwitterOAuth, [{
    key: 'requestToken',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var result, oauth, customerSecret, header;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = {}, oauth = new _oauth2.default(), customerSecret = this.customerSecret, header = {
                  oauth_consumer_key: this.consumerKey,
                  oauth_nonce: oauth.getOAuthNonce({ size: 32, codification: 16 }),
                  oauth_signature_method: "HMAC-SHA1",
                  oauth_timestamp: Date.now().toString().slice(0, -3),
                  oauth_version: "1.0",
                  oauth_callback: this.oauth_callback
                };
                _context.prev = 1;
                _context.next = 4;
                return this.httpsClient(
                // The options to make a http call for request a token.
                this.optionsRequestToken({
                  header: (0, _extends3.default)({}, header, {
                    oauth_signature: oauth.sign({
                      http_method: 'POST',
                      url: 'https://api.twitter.com/oauth/request_token',
                      customerSecret: customerSecret,
                      header: header
                    })
                  })
                }));

              case 4:
                result = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](1);
                console.error(_context.t0);

              case 10:

                this.oauth_token = /oauth_token\=([0-z\-]+)(?=\&)/.exec(result)[1];
                this.accessTokenSecret = /oauth_token_secret\=([0-z]+)(?=\&)/.exec(result)[1];
                // Check if  oauth_callback_confirmed=true

                if (!Boolean(/oauth_callback_confirmed=(true)/.exec('oauth_callback_confirmed=true')[1])) {
                  console.warn('oauth_callback_confirmed=false');
                }

                return _context.abrupt('return', { requestToken: this.oauth_token, requestTokenSecret: this.accessTokenSecret });

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 7]]);
      }));

      function requestToken() {
        return ref.apply(this, arguments);
      }

      return requestToken;
    }()
  }, {
    key: 'headerAuthenticate',
    value: function headerAuthenticate() {
      var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      // let auth = authorization || 'OAuth oauth_consumer_key="AntPzHq9fsnTPbbaP0nrwngJt", oauth_nonce="69e3594f96e53f1a23bd8e5cea3cb0fc", oauth_signature="puHy3%2BFnuOJqRTveYcv8pQWzn%2BM%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1458429951", oauth_version="1.0"';
      var oauth = new _oauth2.default(),
          consumerKey = this.consumerKey || '',
          customerSecret = data.requestTokenSecret || this.accessTokenSecret,
          token = data.requestToken || this.oauth_token,
          tokenSecret = data.requestToken || this.oauth_token,
          timestamp = Date.now().toString().slice(0, -3),
          nonce = oauth.getOAuthNonce({ size: 32, codification: 16 }),
          signature = oauth.sign({
        http_method: 'GET',
        url: 'https://api.twitter.com/oauth/authenticate',
        query: {
          oauth_token: token
        },
        customerSecret: customerSecret,
        accessTokenSecret: tokenSecret,
        header: {
          oauth_consumer_key: consumerKey,
          oauth_token: token,
          oauth_nonce: nonce,
          oauth_signature_method: "HMAC-SHA1",
          oauth_timestamp: timestamp,
          oauth_version: "1.0",
          oauth_callback: encodeURIComponent(this.oauth_callback)
        }
      });

      return {
        OAuth: 'oauth_consumer_key="' + consumerKey + '", ' + 'oauth_token="' + token + '", ' + 'oauth_nonce="' + nonce + '", ' + 'oauth_signature="' + signature + '", ' + 'oauth_callback="' + encodeURIComponent(this.oauth_callback) + '", ' + 'oauth_signature_method="HMAC-SHA1", oauth_timestamp="' + timestamp + '", oauth_version="1.0"'
      };
    }
  }, {
    key: 'authenticate',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _ref,
        // get the request_token

        requestToken, requestTokenSecret, authenticateHeadersSigned;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.requestToken();

              case 3:
                _ref = _context2.sent;
                requestToken = _ref.requestToken;
                requestTokenSecret = _ref.requestTokenSecret;
                // console.log('aaauuuuuuuuu signed '+ JSON.stringify(await this.requestToken()))

                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2['catch'](0);
                console.error(_context2.t0);

              case 11:
                authenticateHeadersSigned = this.headerAuthenticate({ requestToken: requestToken, requestTokenSecret: requestTokenSecret });
                // console.log('aaauuuuuuuuu rtoken '+ requestToken)
                // console.log('aaauuuuuuuuu signed '+ JSON.stringify(authenticateHeadersSigned))

                return _context2.abrupt('return', { requestToken: requestToken, authenticateHeadersSigned: authenticateHeadersSigned });

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function authenticate() {
        return ref.apply(this, arguments);
      }

      return authenticate;
    }()
  }]);
  return TwitterOAuth;
}();

var _initialiseProps = function _initialiseProps() {
  this.httpsClient = function (options) {
    return new _promise2.default(function (resolve, reject) {
      _https2.default.request(options, function (response) {
        var data = '';

        response.on('data', function (chunk) {
          return data += chunk;
        });

        response.on('end', function () {
          console.log('Twitter oAuth: ' + data);
          resolve(data);
        });
      }).end();
    });
  };
};

exports.default = TwitterOAuth;
//# sourceMappingURL=twitter-oauth.js.map
