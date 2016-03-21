'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

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

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _reducer = require('./reducers/reducer-1');

var _reducer2 = _interopRequireDefault(_reducer);

var _topicListReducer = require('./reducers/topic-list-reducer');

var _topicListReducer2 = _interopRequireDefault(_topicListReducer);

var _graphql = require('graphql');

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _schema = require('./graphql/schema');

var _schema2 = _interopRequireDefault(_schema);

var _globalFetch = require('./data-fetch/global-fetch');

var _globalFetch2 = _interopRequireDefault(_globalFetch);

var _twitterOauth = require('./data-fetch/twitter-oauth');

var _twitterOauth2 = _interopRequireDefault(_twitterOauth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Used to respond to POST HTTP (used in graphql server)
// http://expressjs.com/en/api.html#req.body

var upload = (0, _multer2.default)(); // for parsing multipart/form-data

// * React and react-router imports
// ***
// * Express server
// ***


// Check react-router doc: RoutingContext and RouterContext
// import { match, RouterContext } from 'react-router'

// import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'

var history = (0, _createMemoryHistory2.default)();

// * Redux related imports
// ***

// Load Provider component.


// * Redux reducers
// ***


// * GraphQl server. This part could be move to another server (modular and scale the system)
// ***


var fetcher = new _globalFetch2.default('server');
// var fetcher = new globalFetch();

var twitterOAuthClient = new _twitterOauth2.default();

twitterOAuthClient.getData();

var app = (0, _express2.default)();
var PORT = 8009;
var routes = (0, _routes2.default)(history);

function renderFullPage(html, initialState) {
  return '\n    <!doctype html>\n    <html>\n      <head>\n        <meta charset="UTF-8">\n        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">\n        <title>Glasgow Memories Server</title>\n        <link rel="stylesheet" type="text/css" href="/css/app.css">\n      </head>\n      <body>\n        <div id="root">' + html + '</div>\n        <script>\n          window.__INITIAL_STATE__ = ' + (0, _stringify2.default)(initialState) + '\n        </script>\n        <script src="/lib/bundle.js"></script>\n      </body>\n    </html>\n  ';
}

// We are going to fill these out in the sections to follow
function handleRender(request, response) {
  var query = _qs2.default.parse(request.query),
      page = '',
      location = (0, _extends3.default)({}, history.createLocation(request.url), {
    query: query
  });

  console.log('location: ' + (0, _stringify2.default)(location));
  console.log('location query: ' + (0, _stringify2.default)(query));

  (0, _reactRouter.match)({ routes: routes, location: location }, function (error, redirectLocation, renderProps) {
    if (error) {
      response.status(500).send(error.message);
    } else if (redirectLocation) {
      response.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      (function () {
        // You can also check renderProps.components or renderProps.routes for
        // your "not found" component or route respectively, and send a 404 as
        // below, if you're using a catch-all route.
        // res.status(200).send(renderToString(<RouterContext {...renderProps} />))

        // debugger
        // call a component static function

        // create store
        var middleware = (0, _reactRouterRedux.syncHistory)(history);
        var reducer = (0, _redux.combineReducers)({
          // counter,
          topicListPage: _topicListReducer2.default,
          routing: _reactRouterRedux.routeReducer
        });

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

        // console.log('store state: ' + JSON.stringify(store.getState()))

        // In allComponentsDataConsult we will store the action and query needed by each component.
        var allComponentsDataConsult = [];

        // Fetch the data needed by the components to render.
        // The variable renderProps.components is an array with all the React components needed to render a URL.
        // Look for all fetchData method in the components list.
        // Use each fetchData method to get the query and action to retrieve the data for each the component.

        // queries is an array of promises that will contain the fetched data

        //renderProps.components[2].customMethod('barquito');
        var queries = renderProps.components.map(function (component) {
          if (component) {
            var consult = {};
            if ('fetchData' in component) {
              // To the component fetching data method we pass the location and params.
              consult = component.fetchData({
                // The location information with the url query.
                // Ex. if url "/path?query=raspberry" then location.query = raspberry
                location: location,

                // Ex. params:
                // if route "/path/:id" and url "/path/3" then params.id = 3
                params: renderProps.params
              });
              allComponentsDataConsult.push(consult.actions);
              return fetcher.getData(consult.query);
            }
            // We could call more methods if it is needed.
            // if ('customMethod' in component) {
            //   return component.customMethod('SOME_DATA');
            // }
          }

          allComponentsDataConsult.push(false);
          return false;
        });
        // console.log(
        //   queries
        // )

        // Process all the data to the store.
        _promise2.default.all(queries).then(function (values) {
          console.log(values);

          var _loop = function _loop(i) {
            if (values[i]) {
              console.log(';-): store.dispatch ' + (0, _stringify2.default)(allComponentsDataConsult[i]) + ' ' + values[i]);
              allComponentsDataConsult[i].map(function (action) {
                store.dispatch((0, _extends3.default)({
                  type: action.action
                }, values[i].data[action.varName]));
              });
            }
          };

          for (var i = 0 | 0; i < values.length; i++) {
            _loop(i);
          }

          console.log('store state: ' + (0, _stringify2.default)(store.getState()));

          page = renderFullPage((0, _server.renderToString)(_react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(_reactRouter.RoutingContext, renderProps)
          )),
          // Pass initial info to the page with window.__INITIAL_STATE__ =
          store.getState());

          response.writeHead(200, { 'Content-Type': 'text/html' });
          response.end(page, function () {
            console.log('yahoo!!');
          });
          // res.status(200).send(page);
        });
      })();
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

// Used to parse the info in the body of a POST HTTP server call (used in graphql server)
app.use(_bodyParser2.default.json()); // for parsing application/json
app.use(_bodyParser2.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// * GraphQl server. This part could be move to another server (modular and scale the system)
// ***
// POST HTTP
app.post('/graphql', upload.array(), (0, _expressGraphql2.default)({ schema: _schema2.default, pretty: true }));
// GET HTTP
app.use('/graphql', (0, _expressGraphql2.default)({ schema: _schema2.default, pretty: true }));

// GMS Server
app.use(handleRender);

app.listen(PORT, function () {
  //Callback triggered when server is successfully listening. Hurray!
  console.log("Server listening on: http://localhost:%s", PORT);
});
//# sourceMappingURL=gms-server.js.map
