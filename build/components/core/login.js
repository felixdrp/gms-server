'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ReactMixin from 'react-mixin';
// import Auth from '../services/AuthService'

var Login = function (_React$Component) {
  (0, _inherits3.default)(Login, _React$Component);

  function Login() {
    (0, _classCallCheck3.default)(this, Login);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Login).call(this));

    _this.state = {
      user: '',
      password: ''
    };
    return _this;
  }

  (0, _createClass3.default)(Login, [{
    key: 'linkState',
    value: function linkState(data) {}
  }, {
    key: 'login',
    value: function login(e) {
      e.preventDefault();
      // Auth.login(this.state.user, this.state.password)
      //   .catch(function(err) {
      //     alert("There's an error logging in");
      //     console.log("Error logging in", err);
      //   });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'login jumbotron center-block' },
        _react2.default.createElement(
          'h1',
          null,
          'Login'
        ),
        _react2.default.createElement(
          'form',
          { role: 'form' },
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'username' },
              'Username'
            ),
            _react2.default.createElement('input', { type: 'text', valueLink: this.linkState('user'), className: 'form-control', id: 'username', placeholder: 'Username' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'password' },
              'Password'
            ),
            _react2.default.createElement('input', { type: 'password', valueLink: this.linkState('password'), className: 'form-control', id: 'password', ref: 'password', placeholder: 'Password' })
          ),
          _react2.default.createElement(
            'button',
            { type: 'submit', className: 'btn btn-default', onClick: this.login.bind(this) },
            'Submit'
          )
        )
      );
    }
  }]);
  return Login;
}(_react2.default.Component);

exports.default = Login;
//# sourceMappingURL=login.js.map
