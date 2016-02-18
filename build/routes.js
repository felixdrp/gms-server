'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _core = require('./components/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Assign the history:
var routes = function routes(history) {
  return _react2.default.createElement(
    _reactRouter.Router,
    { history: history },
    _react2.default.createElement(
      _reactRouter.Route,
      { path: '/', component: _core.AppContainer },
      _react2.default.createElement(_reactRouter.IndexRoute, { component: _core.Dashboard }),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: 'search', component: _core.CommonViewContainer },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: _core.SearchDashboard })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: 'collections', component: _core.CommonViewContainer },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: _core.CollectionsDashboard }),
        _react2.default.createElement(_reactRouter.Route, { path: 'foo', component: _core.Dashboard })
      )
    )
  );
};

// Please add new core components to /components/core/index.js


exports.default = routes;
//# sourceMappingURL=routes.js.map
