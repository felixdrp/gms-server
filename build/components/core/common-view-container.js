'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _topHeaderMenuContainer = require('./top-header-menu-container');

var _topHeaderMenuContainer2 = _interopRequireDefault(_topHeaderMenuContainer);

var _searchCompact = require('./search-compact');

var _searchCompact2 = _interopRequireDefault(_searchCompact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommonViewContainer = _react2.default.createClass({
  displayName: 'CommonViewContainer',

  statics: {
    customMethod: function customMethod(foo) {
      console.log(this.props);
      return foo === 'bar';
    }
  },
  render: function render() {
    var props = this.props;
    var query = _qs2.default.parse(props.location.search);
    var location = _extends({}, props.location, {
      query: query
    });

    return _react2.default.createElement(
      'div',
      { id: 'common-view-page' },
      _react2.default.createElement(
        'div',
        { className: 'main-header' },
        _react2.default.createElement(
          'div',
          { className: 'header-search-menu' },
          _react2.default.createElement(
            'span',
            { className: 'title' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/' },
              'GMS'
            )
          ),
          _react2.default.createElement(_searchCompact2.default, { location: props.location, params: props.params })
        ),
        _react2.default.createElement(_topHeaderMenuContainer2.default, this.props)
      ),
      _react2.default.createElement(
        'div',
        { className: 'main-viewport' },
        props.children
      ),
      _react2.default.createElement('div', { className: 'main-footer', style: { height: 40, padding: '0 10px' } })
    );
  }
});

function mapStateToProps(state, ownProps) {
  return {
    // if route contains params
    params: ownProps.params,
    location: ownProps.location
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps)(CommonViewContainer);
//# sourceMappingURL=common-view-container.js.map
