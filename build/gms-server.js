'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Check react-router doc: RoutingContext and RouterContext
// import { match, RouterContext } from 'react-router'

// import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _reactRouter = require('react-router');

var _createMemoryHistory = require('history/lib/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _reducer = require('./reducers/reducer-1');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _createMemoryHistory2.default)();
// Load Provider component.


// const store = createStore(counter)

var app = (0, _express2.default)();
var PORT = 8009;
var routes = (0, _routes2.default)(history);

function renderFullPage(html, initialState) {
  return '\n    <!doctype html>\n    <html>\n      <head>\n        <meta charset="UTF-8">\n        <title>Glasgow Memories Server</title>\n        <link rel="stylesheet" type="text/css" href="css/app.css">\n      </head>\n      <body>\n        <div id="root">' + html + '</div>\n        <script>\n          window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + '\n        </script>\n        <script src="/lib/bundle.js"></script>\n      </body>\n    </html>\n  ';
}

// We are going to fill these out in the sections to follow
function handleRender(request, response) {
  var query = _qs2.default.parse(request.query),
      page = '',
      location = _extends({}, history.createLocation(request.url), {
    query: query
  });

  console.log('location: ' + JSON.stringify(location));
  console.log('location query: ' + JSON.stringify(query));

  (0, _reactRouter.match)({ routes: routes, location: location }, function (error, redirectLocation, renderProps) {
    if (error) {
      response.status(500).send(error.message);
    } else if (redirectLocation) {
      response.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      // res.status(200).send(renderToString(<RouterContext {...renderProps} />))

      // debugger
      // call a component static function

      // create store
      var middleware = (0, _reactRouterRedux.syncHistory)(history);
      var reducer = (0, _redux.combineReducers)(_extends({}, _reducer2.default, {
        routing: _reactRouterRedux.routeReducer
      }));

      // // Create Redux store with initial state
      // // const store = createStore(counterApp, initialState)

      var finalCreateStore = (0, _redux.compose)((0, _redux.applyMiddleware)(middleware)
      // DevTools.instrument()
      //
      )(_redux.createStore);
      var store = finalCreateStore(reducer);
      middleware.listenForReplays(store);

      // dispatch the first url location to give the url to the components.
      store.dispatch(_reactRouterRedux.routeActions.push(location.pathname + location.search));

      console.log('store state: ' + JSON.stringify(store.getState()));

      renderProps.components[2].customMethod('barquito');
      page = renderFullPage((0, _server.renderToString)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_reactRouter.RoutingContext, renderProps)
      )),
      // Pass initial info to the page with window.__INITIAL_STATE__ =
      {
        location: location,
        hola: 'hi'
      });

      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(page, function () {
        console.log('yahoo!!');
      });
      // res.status(200).send(page);
    } else {
        // res.status(404).send('Not found')
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not found');
      }
  });
}

// This is fired every time the server side receives a request
// app.use('/static', Express.static('public'));
app.use(_express2.default.static('public'));
app.use(handleRender);

app.listen(PORT, function () {
  //Callback triggered when server is successfully listening. Hurray!
  console.log("Server listening on: http://localhost:%s", PORT);
});
//# sourceMappingURL=gms-server.js.map
