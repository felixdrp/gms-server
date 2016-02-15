'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _topHeaderMenuContainer = require('./top-header-menu-container');

var _topHeaderMenuContainer2 = _interopRequireDefault(_topHeaderMenuContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      { id: 'search-page' },
      _react2.default.createElement(
        'div',
        { className: 'main-header' },
        _react2.default.createElement(SearchCompact, null),
        _react2.default.createElement(_topHeaderMenuContainer2.default, this.props)
      ),
      _react2.default.createElement(
        'div',
        { className: 'main-viewport' },
        _react2.default.createElement(
          'div',
          { style: {} },
          _react2.default.createElement(SearchResultContainer, { data: {} })
        )
      ),
      _react2.default.createElement('div', { className: 'main-footer', style: { height: 40, padding: '0 10px' } })
    );
  }
});

exports.default = Dashboard;
//# sourceMappingURL=search-container.js.map
