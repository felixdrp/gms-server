import React from 'react'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

import AppContainer from './components/core/app-container'
import Two from './components/core/two-component'
import Dashboard from './components/core/dashboard-component'

// Assign the history:
var routes = (history) => (
  <Router history={history}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={Dashboard} />
      <Route path="search" component={Dashboard} />
      <Route path="collections" component={Dashboard}>
        <Route path="foo" component={Two} />
      </Route>
    </Route>
  </Router>
)

export default routes
