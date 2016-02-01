'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = counter;
// import { combineReducers } from 'redux'
//
// const initialState = {
//   visibilityFilter: VisibilityFilters.SHOW_ALL,
//   todos: []
// }
//
// const todoApp = combineReducers({
//   visibilityFilter,
//   todos
// })
//
// export default todoApp

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
//# sourceMappingURL=reducer-1.js.map
