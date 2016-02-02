import React from 'react'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

import AppContainer from './components/app-container'
import Two from './components/two-component'
import Dashboard from './components/dashboard-component'

// Assign the history:
var routes = (history) => (
  <Router history={history}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={Dashboard} />
      <Route path="collections" component={Two} />
    </Route>
  </Router>
)

export default routes
