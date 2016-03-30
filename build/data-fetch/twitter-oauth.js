'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

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
  function TwitterOAuth(type) {
    var _this = this;

    (0, _classCallCheck3.default)(this, TwitterOAuth);

    this.optionsBase = {
      host: 'api.twitter.com',
      port: 443,
      method: 'POST'
    };

    this.optionsRequest = function (authorization) {
      var auth = authorization || 'OAuth oauth_consumer_key="AntPzHq9fsnTPbbaP0nrwngJt", oauth_nonce="69e3594f96e53f1a23bd8e5cea3cb0fc", oauth_signature="puHy3%2BFnuOJqRTveYcv8pQWzn%2BM%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1458429951", oauth_version="1.0"';
      return (0, _extends3.default)({}, _this.optionsBase, {
        path: '/oauth/request_token',
        headers: {
          'Authorization': auth
        }
      });
    };

    this.optionsAuthenticate = function (authorization) {
      var auth = authorization || 'OAuth oauth_consumer_key="AntPzHq9fsnTPbbaP0nrwngJt", oauth_nonce="69e3594f96e53f1a23bd8e5cea3cb0fc", oauth_signature="puHy3%2BFnuOJqRTveYcv8pQWzn%2BM%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1458429951", oauth_version="1.0"';
      return (0, _extends3.default)({}, _this.optionsBase, {
        method: 'GET',
        path: '/oauth/authenticate',
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

    var signComponents2 = {
      method: 'POST'

    };

    this.client = function (authorization) {
      return new _promise2.default(function (resolve, reject) {
        _https2.default.request(_this.optionsRequest(authorization), function (response) {
          var data = '';
          response.on('data', function (chunk) {
            data += chunk;
          });

          response.on('end', function () {
            console.log('tweet X-D: ' + data);
            resolve(data);
          });
        }).end();
      });
    };
  }

  (0, _createClass3.default)(TwitterOAuth, [{
    key: 'getData',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(query) {
        var result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = {};
                _context.prev = 1;
                _context.next = 4;
                return this.client(query);

              case 4:
                result = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](1);

                console.error(_context.t0);

              case 10:
                return _context.abrupt('return', result);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 7]]);
      }));

      function getData(_x) {
        return ref.apply(this, arguments);
      }

      return getData;
    }()
  }]);
  return TwitterOAuth;
}();

exports.default = TwitterOAuth;
//# sourceMappingURL=twitter-oauth.js.map
