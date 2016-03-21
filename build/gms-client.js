'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _history = require('history');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _topicListReducer = require('./reducers/topic-list-reducer');

var _topicListReducer2 = _interopRequireDefault(_topicListReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The initial state from server-generated HTML
// have a look to server code.


// *** Load redux ***


// *** Load react-router ***
// *** Load react and react-dom ***
var initialState = window.__INITIAL_STATE__;

// https://github.com/rackt/history/blob/master/docs/GettingStarted.md


// *** Load store reducers ***
var history = (0, _history.createHistory)();

// https://github.com/rackt/react-router-redux/blob/master/examples/basic/app.js
var middleware = (0, _reactRouterRedux.syncHistory)(history);
var reducer = (0, _redux.combineReducers)({
  topicListPage: _topicListReducer2.default,
  routing: _reactRouterRedux.routeReducer
});

// // Create Redux store with initial state
// // const store = createStore(counterApp, initialState)

var finalCreateStore = (0, _redux.compose)((0, _redux.applyMiddleware)(middleware)
// DevTools.instrument()
//
)(_redux.createStore);
var store = finalCreateStore(reducer, window.__INITIAL_STATE__);
middleware.listenForReplays(store);

console.log(store.getState());

(0, _reactDom.render)(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  (0, _routes2.default)(history)
), document.getElementById('root'));
//# sourceMappingURL=gms-client.js.map
