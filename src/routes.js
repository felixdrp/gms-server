import React from 'react'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

/**
 * React-router components.
 *
 * React router help to render component related to the path or url.
 *
 * Please have a look to:
 * https://github.com/reactjs/react-router
 *
 */

// Please add new core components to /components/core/index.js

import {
  AppContainer,
  CommonViewContainer,
  CollectionsDashboardContainer,
  Dashboard,
  SearchDashboardContainer,
} from './components/core'

// Assign the history:
var routes = (history) => (
  <Router history={history}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={Dashboard} />
      <Route path="search" component={CommonViewContainer} >
        <IndexRoute component={SearchDashboardContainer} />
      </Route>
      <Route path="collections" component={CommonViewContainer} >
        <IndexRoute component={CollectionsDashboardContainer} />
        <Route path="foo" component={Dashboard} />
      </Route>
    </Route>
  </Router>
)

export default routes
