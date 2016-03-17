// * Express server
// ***
import Express from 'express'

// Used to respond to POST HTTP (used in graphql server)
// http://expressjs.com/en/api.html#req.body
import bodyParser from 'body-parser'
import multer from 'multer'
var upload = multer(); // for parsing multipart/form-data

// * React and react-router imports
// ***
import React from 'react'
import { renderToString } from 'react-dom/server'

// Check react-router doc: RoutingContext and RouterContext
// import { match, RouterContext } from 'react-router'
import { match, RoutingContext } from 'react-router'
// import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
import createMemoryHistory from 'history/lib/createMemoryHistory';
var history = createMemoryHistory();

import Routes from './routes';

import qs from 'qs'

// * Redux related imports
// ***

import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
// Load Provider component.
import { Provider } from 'react-redux';
import { syncHistory, routeReducer, routeActions } from 'react-router-redux'

// * Redux reducers
// ***
import counter from './reducers/reducer-1'
import topicListPage from './reducers/topic-list-reducer'

// * GraphQl server. This part could be move to another server (modular and scale the system)
// ***
import { graphql } from 'graphql'
import graphqlHTTP from 'express-graphql'
import schema from './graphql/schema'

import globalFetch from './data-fetch/global-fetch'

var fetcher = new globalFetch('server');
// var fetcher = new globalFetch();

// const store = createStore(counter)

const app = Express();
const PORT = 8009;
const routes = Routes( history );

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
        <title>Glasgow Memories Server</title>
        <link rel="stylesheet" type="text/css" href="/css/app.css">
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
        // counter,
        topicListPage,
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
      store.dispatch( routeActions.push( location.pathname + location.search ) );

      // console.log('store state: ' + JSON.stringify(store.getState()))

      // In allComponentsDataConsult we will store the action and query needed by each component.
      const allComponentsDataConsult = [];

      // Fetch the data needed by the components to render.
      // The variable renderProps.components is an array with all the React components needed to render a URL.
      // Look for all fetchData method in the components list.
      // Use each fetchData method to get the query and action to retrieve the data for each the component.

      // queries is an array of promises that will contain the fetched data

      //renderProps.components[2].customMethod('barquito');
      let queries = renderProps.components.map(
        (component) => {
          if (component) {
            let consult = {};
            if ('fetchData' in component) {
              // To the component fetching data method we pass the location and params.
              consult = component.fetchData(
                {
                  // The location information with the url query.
                  // Ex. if url "/path?query=raspberry" then location.query = raspberry
                  location,

                  // Ex. params:
                  // if route "/path/:id" and url "/path/3" then params.id = 3
                  params: renderProps.params
                }
              );
              allComponentsDataConsult.push( consult.actions );
              return fetcher.getData( consult.query );
            }
            // We could call more methods if it is needed.
            // if ('customMethod' in component) {
            //   return component.customMethod('SOME_DATA');
            // }
          }

          allComponentsDataConsult.push(false);
          return false;
        }
      )
      // console.log(
      //   queries
      // )

      // Process all the data to the store.
      Promise.all( queries ).then( function(values) {
        console.log(values);

        for ( let i=0|0; i < values.length; i++ ) {
          if (values[i]) {
            console.log(';-): store.dispatch ' + JSON.stringify(allComponentsDataConsult[i]) + ' ' + values[i]);
            allComponentsDataConsult[i].map(
              (action) => {
                store.dispatch({
                  type: action.action,
                  ...values[i].data[action.varName]
                });
              }
            )
          }
        }

        console.log('store state: ' + JSON.stringify(store.getState()))

        page = renderFullPage(
          renderToString(
            <Provider store={store}>
              <RoutingContext {...renderProps} />
            </Provider>
          ),
          // Pass initial info to the page with window.__INITIAL_STATE__ =
          store.getState()
        )

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(page, () => {console.log('yahoo!!')});
        // res.status(200).send(page);
      });

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

// Used to parse the info in the body of a POST HTTP server call (used in graphql server)
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// * GraphQl server. This part could be move to another server (modular and scale the system)
// ***
// POST HTTP
app.post( '/graphql', upload.array(), graphqlHTTP({ schema: schema, pretty: true }) );
// GET HTTP
app.use('/graphql', graphqlHTTP({ schema: schema, pretty: true }))

// GMS Server
app.use(handleRender)

app.listen(PORT, function() {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
})
