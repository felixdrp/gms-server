import React from 'react'
import { render } from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import App from './containers/App'
import App from './components/app-component'

// import generalStore from './reducers/reducer-1'
import counter from './reducers/reducer-1'
// import counter from './reducers/reducer-1'

import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
import { match, RoutingContext } from 'react-router'
import Routes from './routes';
import { createHistory } from 'history';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__

// Create Redux store with initial state
// const store = createStore(counterApp, initialState)
var history = createHistory();
console.log(history)
history.push(initialState.location)
const store = createStore(counter);
const routes = Routes( browserHistory );

console.log(routes)
console.log(history)

match({ location: initialState.location, routes }, (error, redirectLocation, renderProps) => {
  render(
    (
      <Provider store={store}>
        <RoutingContext {...renderProps} location={location} />
      </Provider>
    ),
    document.getElementById('root')
  )
});
