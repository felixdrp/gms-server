'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _topHeaderMenuContainer = require('./top-header-menu-container');

var _topHeaderMenuContainer2 = _interopRequireDefault(_topHeaderMenuContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dark = 'hsl(200, 20%, 20%)';
var light = '#777';
var styles = {};

styles.wrapper = {
  padding: '10px 20px',
  // overflow: 'hidden',
  // background: dark,
  color: light
};

styles.link = {
  padding: 5,
  color: light,
  fontWeight: 200
};

styles.activeLink = _extends({}, styles.link, {
  // background: light,
  color: dark
});

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
          { style: { display: 'flex', flexDirection: 'column' } },
          _react2.default.createElement(
            'div',
            { style: { margin: 20 } },
            props.location.pathname,
            props.children
          ),
          _react2.default.createElement(
            'div',
            { style: {} },
            _react2.default.createElement(
              'h1',
              null,
              'GMS'
            ),
            _react2.default.createElement(
              'form',
              { action: 'search' },
              _react2.default.createElement(
                'div',
                { style: {
                    height: 38,
                    overflowX: 'hidden',
                    overflowY: 'hidden',
                    verticalAlign: 'top',
                    whiteSpace: 'nowrap',
                    lineHeight: 0,
                    whiteSpace: 'nowrap'
                  }
                },
                _react2.default.createElement(
                  'div',
                  { style: { position: 'relative', lineHeight: 0, whiteSpace: 'nowrap' } },
                  _react2.default.createElement(
                    'div',
                    { id: 'search-query', style: { display: 'inline-block' } },
                    _react2.default.createElement('input', { type: 'text', name: 'q' })
                  ),
                  _react2.default.createElement(
                    'button',
                    { value: 'Search', name: 'bt-search', type: 'submit' },
                    'Search'
                  )
                )
              )
            )
          )
        )
      ),
      _react2.default.createElement('div', { className: 'main-footer' })
    );
  }
});

exports.default = Dashboard;
//# sourceMappingURL=dashboard-component.js.map
