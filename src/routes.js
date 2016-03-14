import React from 'react'
import { browserHistory, Router, Route, IndexRoute, IndexRedirect } from 'react-router'

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
  TopicDashboard,
} from './components/core'

// Assign the history:
var routes = (history) => (
  <Router history={history}>
    <Route path="/" component={AppContainer}>
      {/*<IndexRoute component={TopicDashboard} />*/}
      <IndexRedirect to="/topicList" />
      <Route path="search" component={CommonViewContainer} >
        <IndexRoute component={SearchDashboardContainer} />
      </Route>
      <Route path="summary" component={CommonViewContainer} >
        <IndexRoute component={SearchDashboardContainer} />
      </Route>
      <Route path="/topicList" component={TopicDashboard} />
    </Route>
  </Router>
)

export default routes
