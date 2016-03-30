"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OAuth = function () {
  function OAuth(type) {
    (0, _classCallCheck3.default)(this, OAuth);
  }

  // Return a random code to use in the oauth_nonce
  // More info:
  // https://dev.twitter.com/oauth/overview/authorizing-requests


  (0, _createClass3.default)(OAuth, [{
    key: "getOAuthNonce",
    value: function getOAuthNonce() {
      var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      // The size of the response.
      var size = data.size || 42,

      // The codification: 2 binary, 8 octal, 16 hex, 36 number and alphabet
      codification = data.codification || 36,
          codec = function codec() {
        return Math.floor(Math.random() * codification).toString(codification);
      };
      return Array(size).fill(codec()).reduce(function (prev) {
        return prev + codec();
      });
    }

    // Sign for the oauth protocol.

  }, {
    key: "sign",
    value: function sign() {
      var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      // https://dev.twitter.com/oauth/overview/creating-signatures
      // Tweet token 1 step
      //

      var signComponents1 = {
        oauth_consumer_key: data.consumerKey || "AntPzHq9fsnTPbbaP0nrwngJt",
        oauth_nonce: data.nonce || "69e3594f96e53f1a23bd8e5cea3cb0fc",
        // oauth_signature: "puHy3%2BFnuOJqRTveYcv8pQWzn%2BM%3D",
        oauth_signature_method: data.signatureMethod || "HMAC-SHA1",
        oauth_timestamp: data.oauth_timestamp || Date.now().toString().slice(0, -3),
        oauth_version: data.version || "1.0"
      };

      // If it has the token, to add token.
      if (data.token) {
        signComponents1 = (0, _extends3.default)({}, signComponents1, {
          oauth_token: data.token
        });
      }

      // If it has a query, to add query.
      if (data.query) {
        signComponents1 = (0, _extends3.default)({}, signComponents1, data.query);
      }

      // If it has a body, to add body.
      if (data.query) {
        signComponents1 = (0, _extends3.default)({}, signComponents1, data.body);
      }

      // If it has a

      var parameterString = (0, _keys2.default)(signComponents1).sort().reduce(function (prev, curr) {
        return prev + '&' + encodeURIComponent(curr) + '=' + encodeURIComponent(signComponents1[curr]);
      }, '');
      // parameterString = 'include_entities=true' + parameterString;
      parameterString = parameterString.substring(1);
      console.log(parameterString);

      // Tweet token 2 step
      var signatureBase = 'POST&' + encodeURIComponent('https://api.twitter.com/oauth/request_token') + '&' + encodeURIComponent(parameterString);
      var test2 = 'POST&https%3A%2F%2Fapi.twitter.com%2Foauth%2Frequest_token&oauth_consumer_key%3DAntPzHq9fsnTPbbaP0nrwngJt%26oauth_nonce%3D69e3594f96e53f1a23bd8e5cea3cb0fc%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1458429951%26oauth_version%3D1.0';
      console.log(signatureBase == test2);

      // Tweet token 3 step

      var customerSecret = 'z3cbkta9cgkzTOmxREHcoGa8NRaaDXsSk5TfHVpOLkXEEYzmbU';
      var keySecret = encodeURIComponent(customerSecret) + '&';
      var hash = crypto.createHmac('SHA1', keySecret).update(signatureBase).digest('base64');

      console.log('oauth_signature:"' + encodeURIComponent(hash) + '"');
      console.log('oauth_signature:"puHy3%2BFnuOJqRTveYcv8pQWzn%2BM%3D"');

      return encodeURIComponent(hash);
    }
  }]);
  return OAuth;
}();

exports.default = OAuth;
//# sourceMappingURL=oauth.js.map
