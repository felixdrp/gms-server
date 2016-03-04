'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = counter;

var _actions = require('../actions/actions');

function counter() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _actions.ADD_TOPIC_LIST:
      return state + 1;
    default:
      return state;
  }
}
//# sourceMappingURL=topicListReducer.js.map
