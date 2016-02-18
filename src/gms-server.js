import React from 'react'
import { renderToString } from 'react-dom/server'
import Express from 'express'

// Check react-router doc: RoutingContext and RouterContext
// import { match, RouterContext } from 'react-router'
import { match, RoutingContext } from 'react-router'
// import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
import createMemoryHistory from 'history/lib/createMemoryHistory';
var history = createMemoryHistory();

import Routes from './routes';

import qs from 'qs'

import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
// Load Provider component.
import { Provider } from 'react-redux';
import { syncHistory, routeReducer, routeActions } from 'react-router-redux'

import counter from './reducers/reducer-1'

// const store = createStore(counter)

const app = Express()
const PORT = 8009
const routes = Routes( history );

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Glasgow Memories Server</title>
        <link rel="stylesheet" type="text/css" href="css/app.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/lib/bundle.js"></script>
      </body>
    </html>
  `
}

// We are going to fill these out in the sections to follow
function handleRender(request, response) {
  let query = qs.parse(request.query),
      page = '',
      location = {
        ...history.createLocation(request.url),
        query
      };

  console.log('location: ' + JSON.stringify(location))
  console.log('location query: ' + JSON.stringify(query))

  match({ routes, location: location }, (error, redirectLocation, renderProps) => {
    if (error) {
      response.status(500).send(error.message)
    } else if (redirectLocation) {
      response.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      // res.status(200).send(renderToString(<RouterContext {...renderProps} />))

      // debugger
      // call a component static function

      // create store
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
      const store = finalCreateStore(reducer)
      middleware.listenForReplays(store)

      // dispatch the first url location to give the url to the components.
      store.dispatch(routeActions.push(location.pathname + location.search));

      console.log('store state: ' + JSON.stringify(store.getState()))

      renderProps.components[2].customMethod('barquito');
      page = renderFullPage(
        renderToString(
          <Provider store={store}>
            <RoutingContext {...renderProps} />
          </Provider>
        ),
        // Pass initial info to the page with window.__INITIAL_STATE__ =
        {
          location,
          hola:'hi',
        }
      )

      response.writeHead(200, {'Content-Type': 'text/html'})
      response.end(page, () => {console.log('yahoo!!')});
      // res.status(200).send(page);
    } else {
      // res.status(404).send('Not found')
      response.writeHead(404, {'Content-Type': 'text/plain'})
      response.end('Not found');
    }
  });
}

// This is fired every time the server side receives a request
// app.use('/static', Express.static('public'));
app.use(Express.static('public'));
app.use(handleRender)

app.listen(PORT, function() {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
})
