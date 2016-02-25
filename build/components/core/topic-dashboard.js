'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _topHeaderMenuContainer = require('./top-header-menu-container');

var _topHeaderMenuContainer2 = _interopRequireDefault(_topHeaderMenuContainer);

var _searchCompact = require('./search-compact');

var _searchCompact2 = _interopRequireDefault(_searchCompact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Component that renders the '/' (root) view.
 *
 */

var Dashboard = _react2.default.createClass({
  displayName: 'Dashboard',

  statics: {
    customMethod: function customMethod(foo) {
      console.log(this.props);
      return foo === 'bar';
    }
  },
  render: function render() {
    var props = this.props;
    return _react2.default.createElement(
      'div',
      { id: 'dashboard' },
      _react2.default.createElement(
        'div',
        { className: 'main-header' },
        _react2.default.createElement(_topHeaderMenuContainer2.default, this.props)
      ),
      _react2.default.createElement(
        'div',
        { className: 'main-viewport' },
        _react2.default.createElement(
          'div',
          { style: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } },
          _react2.default.createElement(
            'div',
            { className: '', style: { flex: 1 } },
            _react2.default.createElement(
              'h1',
              null,
              'GMS'
            )
          ),
          _react2.default.createElement(
            'div',
            { style: { flex: 1, width: 600 } },
            _react2.default.createElement(_searchCompact2.default, this.props)
          )
        )
      ),
      _react2.default.createElement('div', { className: 'main-footer', style: {} })
    );
  }
});

exports.default = Dashboard;
//# sourceMappingURL=topic-dashboard.js.map
