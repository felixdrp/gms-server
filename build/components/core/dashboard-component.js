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
          { style: { display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: '1 100%' } },
          _react2.default.createElement(
            'div',
            { className: 'center' },
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
                    position: 'relative',
                    height: 40,
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
                    { id: 'search-query', style: {} },
                    _react2.default.createElement('input', {
                      type: 'text',
                      name: 'q',
                      maxLength: '2048',
                      style: {}
                    })
                  ),
                  _react2.default.createElement(
                    'button',
                    { value: 'Search', name: 'bt-search', type: 'submit', style: { height: 40, padding: '0 15px' } },
                    'Search'
                  )
                )
              )
            )
          )
        )
      ),
      _react2.default.createElement('div', { className: 'main-footer', style: { height: 40, padding: '0 10px' } })
    );
  }
});

exports.default = Dashboard;
//# sourceMappingURL=dashboard-component.js.map
