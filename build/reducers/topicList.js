'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = counter;
function counter() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
//# sourceMappingURL=topicList.js.map
