'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
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

// import { graphql } from 'graphql'
// require('es6-promise').polyfill();
// import isomorphicFetch from 'isomorphic-fetch';
var rp = require('request-promise');
// import schema from '../graphql/schema'

var GlobalFetch = function () {
  function GlobalFetch(type) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, GlobalFetch);

    this.type = type || 'client';
    // Create a different fetch for server and client
    if (type === 'server') {
      // Fetch data using graphql module.
      this.client = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(query) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return rp({
                    uri: 'http://localhost:8009/graphql?query=' + query,
                    json: true
                  });

                case 2:
                  return _context.abrupt('return', _context.sent);

                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        })),
            _this = _this2;
        return function (_x) {
          return ref.apply(_this, arguments);
        };
      }();
    } else {
      // Fetch data using graphql module.
      this.client = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(query) {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return rp({
                    uri: location.origin + '/graphql?query=' + query,
                    json: true
                  });

                case 2:
                  return _context2.abrupt('return', _context2.sent);

                case 3:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        })),
            _this = _this2;
        return function (_x2) {
          return ref.apply(_this, arguments);
        };
      }();
      // this.client = (query) => {
      //   return fetch(location.origin + '/graphql?query=' + query);
      // };
    }
  }

  (0, _createClass3.default)(GlobalFetch, [{
    key: 'getData',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(query) {
        var result;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                result = {};

                console.log('fetching data1:' + result);
                _context3.prev = 2;
                _context3.next = 5;
                return this.client(query);

              case 5:
                result = _context3.sent;
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3['catch'](2);

                console.error(_context3.t0);
                // throw e;

              case 11:
                console.log('query: ' + query);
                console.log('fetching data3:' + (0, _stringify2.default)(result.text()));
                return _context3.abrupt('return', result.json());

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 8]]);
      }));
      return function getData(_x3) {
        return ref.apply(this, arguments);
      };
    }()
  }]);
  return GlobalFetch;
}();

exports.default = GlobalFetch;
//# sourceMappingURL=global-fetch.js.map
