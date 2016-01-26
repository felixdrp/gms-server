import React from 'react'
import { renderToString } from 'react-dom/server'
import Express from 'express'

// Check react-router doc: RoutingContext and RouterContext
// import { match, RouterContext } from 'react-router'
import { match, RoutingContext } from 'react-router'
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
import createMemoryHistory from 'history/lib/createMemoryHistory';
const history = require('history');

import routes from './routes';

import qs from 'qs'
import { createStore } from 'redux'
// Load Provider component.
import { Provider } from 'react-redux';

const app = Express()
const PORT = 8009

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Glasgow Memories Server</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  let request = req,
      response = res,
      params = qs.parse(req.query),
      page = '';

console.log(JSON.stringify(params))
  // let history = createMemoryHistory();
  // // let store = configureStore();

  let location = history.createLocation(req.url);

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      // res.status(200).send(renderToString(<RouterContext {...renderProps} />))
      page = renderFullPage(
        renderToString(<Provider ><RoutingContext {...renderProps} location={location} /></Provider>),
        {hola:'hi'}
      )

      response.writeHead(200, {'Content-Type': 'text/html'})
      response.end(page);
      // res.status(200).send(page);
    } else {
      // res.status(404).send('Not found')
      response.writeHead(404, {'Content-Type': 'text/plain'})
      response.end('Not found');
    }
  });
}

// This is fired every time the server side receives a request
app.use(handleRender)

app.listen(PORT, function() {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
})
