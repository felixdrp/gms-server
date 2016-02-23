// *** Load react and react-dom ***
import React from 'react'
import { render } from 'react-dom'

// *** Load react-router ***
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
import { match, RoutingContext } from 'react-router'
import Routes from './routes';
import { createHistory } from 'history';

// *** Load redux ***
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { syncHistory, routeReducer } from 'react-router-redux'

// *** Load store reducers ***
// import generalStore from './reducers/reducer-1'
import counter from './reducers/reducer-1'

// The initial state from server-generated HTML
// have a look to server code.
const initialState = window.__INITIAL_STATE__

// https://github.com/rackt/history/blob/master/docs/GettingStarted.md
const history = createHistory()

// https://github.com/rackt/react-router-redux/blob/master/examples/basic/app.js
const middleware = syncHistory(history)
const reducer = combineReducers({
  ...counter,
  routing: routeReducer
})

// // Create Redux store with initial state
// // const store = createStore(counterApp, initialState)

const finalCreateStore = compose(
  applyMiddleware(middleware)
  // DevTools.instrument()
  //
)(createStore)
const store = finalCreateStore(reducer, window.__INITIAL_STATE__)
middleware.listenForReplays(store)

console.log(store.getState())

render(
  <Provider store={store}>
    {Routes( history )}
  </Provider>,
  document.getElementById('root')
)
