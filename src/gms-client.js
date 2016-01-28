import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import App from './containers/App'
import todoApp from './reducers'

import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
import Routes from './routes';
import { createHashHistory } from 'history/lib/createHashHistory'

const routes = Routes( createHashHistory() );

console.log(routes)
// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__

// let history = createHashHistory();
let store = createStore(todoApp);

// Create Redux store with initial state
// const store = createStore(counterApp, initialState)

render(
  <Provider store={store}>
    routes
  </Provider>,
  document.getElementById('root')
)
