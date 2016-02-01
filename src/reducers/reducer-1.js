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

export default function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
