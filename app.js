'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Check react-router doc: RoutingContext and RouterContext
// import { match, RouterContext } from 'react-router'

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouter = require('react-router');

var _createMemoryHistory = require('history/lib/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = require('history');
// Load Provider component.

//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
var PORT = 8009;

function renderFullPage(html, initialState) {
  return '\n    <!doctype html>\n    <html>\n      <head>\n        <title>Glasgow Memories Server</title>\n      </head>\n      <body>\n        <div id="root">' + html + '</div>\n        <script>\n          window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + '\n        </script>\n        <script src="/static/bundle.js"></script>\n      </body>\n    </html>\n    ';
}

//Create a server
//var server = http.createServer(serve);
http.createServer(function (request, response) {
  var req = request,
      res = response,
      params = _qs2.default.parse(req.query),
      page = '';

  // console.log(Object.keys(req))
  // let history = createMemoryHistory();
  // // let store = configureStore();

  var location = history.createLocation(req.url);

  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (error, redirectLocation, renderProps) {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      // res.status(200).send(renderToString(<RouterContext {...renderProps} />))
      page = renderFullPage((0, _server.renderToString)(_react2.default.createElement(
        _reactRedux.Provider,
        null,
        _react2.default.createElement(_reactRouter.RoutingContext, _extends({}, renderProps, { location: location }))
      )), { hola: 'hi' });
      // '<!DOCTYPE html><html><head></head><body>' +
      // // renderToString(<RouterContext {...renderProps} />) +
      // renderToString(<RoutingContext {...renderProps} location={location} />) +
      // '</body></html>';

      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(page);
    } else {
      // res.status(404).send('Not found')
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('Not found');
    }
  });
}).listen(PORT, function () {
  //Callback triggered when server is successfully listening. Hurray!
  console.log("Server listening on: http://localhost:%s", PORT);
});