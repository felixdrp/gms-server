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

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GlobalFetch = function () {
  function GlobalFetch(type) {
    var _this = this;

    (0, _classCallCheck3.default)(this, GlobalFetch);

    this.type = type || 'client';
    // Create a different fetch for server and client
    if (type === 'server') {
      // Server fetching data .
      // Change host and port if the server change in the future
      this.options = function (query) {
        return {
          host: 'localhost',
          port: 8009,
          method: 'GET',
          path: '/graphql?query=' + escape(query),
          headers: { 'mlk-server': 'yeaaahh' }
        };
      };
    } else {
      // Client Fetching data.
      this.options = function (query) {
        return {
          host: location.hostname,
          port: location.port,
          method: 'GET',
          path: '/graphql?query=' + escape(query),
          headers: { 'mlk-client': 'yeaaahh' }

        };
      };
    }

    this.client = function (query) {
      return new _promise2.default(function (resolve, reject) {
        _http2.default.request(_this.options(query), function (response) {
          var data = '';
          response.on('data', function (chunk) {
            data += chunk;
          });

          response.on('end', function () {
            console.log('X-D: ' + data);
            resolve(JSON.parse(data));
          });
        }).end();
      });
    };
  }

  (0, _createClass3.default)(GlobalFetch, [{
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
  return GlobalFetch;
}(); /**
      * Module to Facade the data fetch from server and client.
      *
      *
      * Example usage:
      * ```
      * //Server
      * var fetcher = new GlobalFetch('server')
      *
      * // Client
      * var fetcher = new GlobalFetch()
      *
      * ```
      */

exports.default = GlobalFetch;
//# sourceMappingURL=global-fetch.js.map
