'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _graphql = require('graphql');

var _lokka = require('lokka');

var _lokka2 = _interopRequireDefault(_lokka);

var _lokkaTransportHttp = require('lokka-transport-http');

var _schema = require('../graphql/schema');

var _schema2 = _interopRequireDefault(_schema);

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

var GlobalFetch = function () {
  function GlobalFetch(type) {
    (0, _classCallCheck3.default)(this, GlobalFetch);

    this.type = type || 'client';
    // Create a different fetch for server and client
    // create a new Lokka client
    if (type === 'server') {
      this.client = _graphql.graphql;
    } else {
      this.client = new _lokka2.default({
        transport: new _lokkaTransportHttp.Transport('/graphql')
      });
    }
    // console.log(this.client)

    // // Get the initial data from the transport (it's a promise)
    // this.dataPromise = this.client
    //   // invoke the GraphQL query to get all the items
    //   .query(`
    //     {items}
    //   `)
    //   .then(res => res.items);
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

                console.log('fetching data1:' + result);
                _context.prev = 2;

                if (!(this.type === 'client')) {
                  _context.next = 10;
                  break;
                }

                console.log('mlkkk');
                _context.next = 7;
                return this.client.query('{collections}');

              case 7:
                result = _context.sent;
                _context.next = 13;
                break;

              case 10:
                _context.next = 12;
                return this.client(_schema2.default, 'query ' + query);

              case 12:
                result = _context.sent;

              case 13:
                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context['catch'](2);

                new Throw(_context.t0);

              case 18:
                console.log('query: ' + query);
                console.log('fetching data3:' + (0, _stringify2.default)(result));
                return _context.abrupt('return', result);

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 15]]);
      }));
      return function getData(_x) {
        return ref.apply(this, arguments);
      };
    }()
  }, {
    key: 'a',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var result;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log('await');
                result = 'mlk';
                _context2.next = 4;
                return b();

              case 4:
                result = _context2.sent;
                _context2.next = 7;
                return (0, _graphql.graphql)(_schema2.default, 'query {collections}');

              case 7:
                result = _context2.sent;
                _context2.next = 10;
                return (0, _graphql.graphql)(_schema2.default, 'query {topicList(amount:1){...TopicFragment,urlList{url}}} fragment TopicFragment on Topic {id,title}');

              case 10:
                result = _context2.sent;


                console.log("graphql:" + (0, _stringify2.default)(result));

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      return function a() {
        return ref.apply(this, arguments);
      };
    }()
  }]);
  return GlobalFetch;
}();

exports.default = GlobalFetch;
//# sourceMappingURL=global-fetch.js.map
