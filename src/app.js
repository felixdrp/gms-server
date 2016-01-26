import React from 'react'
import { renderToString } from 'react-dom/server'

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

//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT = 8009;

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

//Create a server
//var server = http.createServer(serve);
http.createServer( (request, response) => {
  let req = request,
      res = response,
      params = qs.parse(req.query),
      page = '';

// console.log(Object.keys(req))
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
      page = renderFullPage(renderToString(<Provider store={}><RoutingContext {...renderProps} location={location} /></Provider>), {hola:'hi'})
        // '<!DOCTYPE html><html><head></head><body>' +
        // // renderToString(<RouterContext {...renderProps} />) +
        // renderToString(<RoutingContext {...renderProps} location={location} />) +
        // '</body></html>';

      response.writeHead(200, {'Content-Type': 'text/html'})
      response.end(page);

    } else {
      // res.status(404).send('Not found')
      response.writeHead(404, {'Content-Type': 'text/plain'})
      response.end('Not found');
    }
  })
}).listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
