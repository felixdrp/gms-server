import React from 'react'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

// Please add new core components to /components/core/index.js
import {
  AppContainer,
  Dashboard,
  CommonViewContainer,
  SearchDashboard,
  CollectionsDashboard,
} from './components/core'

// Assign the history:
var routes = (history) => (
  <Router history={history}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={Dashboard} />
      <Route path="search" component={CommonViewContainer} >
        <IndexRoute component={SearchDashboard} />
      </Route>
      <Route path="collections" component={CommonViewContainer} >
        <IndexRoute component={CollectionsDashboard} />
        <Route path="foo" component={Dashboard} />
      </Route>
    </Route>
  </Router>
)

export default routes
