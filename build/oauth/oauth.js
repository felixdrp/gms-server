"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
  }, {
    key: "sign",
    value: function sign(data) {}
  }]);
  return OAuth;
}();

exports.default = OAuth;
//# sourceMappingURL=oauth.js.map
