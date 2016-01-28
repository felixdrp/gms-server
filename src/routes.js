import React from 'react'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

import App from './components/app-component'
import Two from './components/two-component'

// Assign the history: 
var routes = (history) => (
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="foo" component={Two} />
    </Route>
  </Router>
)

export default routes
