"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppContainer = function AppContainer(props) {
  return _react2.default.createElement(
    "div",
    { id: "maincontainer" },

    // https://github.com/rackt/react-router/blob/master/examples/passing-props-to-children/app.js
    props.children
    // && React.cloneElement(
    //    props.children,
    //    {
    //      ...props
    //    }
    //  )

  );
};

exports.default = AppContainer;
//# sourceMappingURL=app-container.js.map
