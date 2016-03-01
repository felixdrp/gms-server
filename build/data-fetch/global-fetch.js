'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _graphql = require('graphql');

var _lokka = require('lokka');

var _lokka2 = _interopRequireDefault(_lokka);

var _lokkaTransportHttp = require('lokka-transport-http');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GlobalFetch = function GlobalFetch(type) {
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
}; /**
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
