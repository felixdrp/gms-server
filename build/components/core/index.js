'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectionsDashboardContainer = exports.SearchDashboardContainer = exports.CommonViewContainer = exports.Dashboard = exports.AppContainer = undefined;

var _appContainer = require('./app-container');

var _appContainer2 = _interopRequireDefault(_appContainer);

var _dashboardComponent = require('./dashboard-component');

var _dashboardComponent2 = _interopRequireDefault(_dashboardComponent);

var _commonViewContainer = require('./common-view-container');

var _commonViewContainer2 = _interopRequireDefault(_commonViewContainer);

var _searchDashboardContainer = require('./search-dashboard-container');

var _searchDashboardContainer2 = _interopRequireDefault(_searchDashboardContainer);

var _collectionsDashboardContainer = require('./collections-dashboard-container');

var _collectionsDashboardContainer2 = _interopRequireDefault(_collectionsDashboardContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.AppContainer = _appContainer2.default; /**
                                                * Module to export the components needed by react-router (please look ./src/routes.js)
                                                *
                                                */

exports.Dashboard = _dashboardComponent2.default;
exports.CommonViewContainer = _commonViewContainer2.default;
exports.SearchDashboardContainer = _searchDashboardContainer2.default;
exports.CollectionsDashboardContainer = _collectionsDashboardContainer2.default;
//# sourceMappingURL=index.js.map
