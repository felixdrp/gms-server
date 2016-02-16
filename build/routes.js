'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _appContainer = require('./components/core/app-container');

var _appContainer2 = _interopRequireDefault(_appContainer);

var _twoComponent = require('./components/core/two-component');

var _twoComponent2 = _interopRequireDefault(_twoComponent);

var _dashboardComponent = require('./components/core/dashboard-component');

var _dashboardComponent2 = _interopRequireDefault(_dashboardComponent);

var _searchContainer = require('./components/core/search-container');

var _searchContainer2 = _interopRequireDefault(_searchContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Assign the history:
var routes = function routes(history) {
  return _react2.default.createElement(
    _reactRouter.Router,
    { history: history },
    _react2.default.createElement(
      _reactRouter.Route,
      { path: '/', component: _appContainer2.default },
      _react2.default.createElement(_reactRouter.IndexRoute, { component: _dashboardComponent2.default }),
      _react2.default.createElement(_reactRouter.Route, { path: 'search', component: _searchContainer2.default }),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: 'collections', component: _searchContainer2.default },
        _react2.default.createElement(_reactRouter.Route, { path: 'foo', component: _twoComponent2.default })
      )
    )
  );
};

exports.default = routes;
//# sourceMappingURL=routes.js.map
