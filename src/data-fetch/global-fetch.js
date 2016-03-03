/**
 * Module to Facade the data fetch from server and client.
 *
 *
 * Example usage:
 * ```
 * //Server
 * var fetcher = new GlobalFetch('server')
 *
 * // Client
 * var fetcher = new GlobalFetch()
 *
 * ```
 */

// import { graphql } from 'graphql'
// require('es6-promise').polyfill();
// import isomorphicFetch from 'isomorphic-fetch';
var rp = require('request-promise');
// import schema from '../graphql/schema'


export default class GlobalFetch {
  constructor(type) {
    this.type = type || 'client';
    // Create a different fetch for server and client
    if (type === 'server') {
      // Fetch data using graphql module.
      this.client = async (query) => {
        return await rp(
          {
            uri: 'http://localhost:8009/graphql?query=' + query,
            json: true,
          }
        );
      };
    } else {
      // Fetch data using graphql module.
      this.client = async (query) => {
        return await rp(
          {
            uri: location.origin + '/graphql?query=' + query,
            json: true,
          }
        );
      };
      // this.client = (query) => {
      //   return fetch(location.origin + '/graphql?query=' + query);
      // };
    }
  }

  async getData(query) {
    let result = {};
    console.log('fetching data1:' + result)
    try {
      // if (this.type === 'client') {
      //   console.log('mlkkk')
      //   result = await this.client( query );
      //   // fetch('graphql?query=' + query).then((d)=>console.log('XXX: ' + d))
      // } else {
      //   // result = await this.client(schema, 'query ' + query);
      // }
      result = await this.client( query );

    }
    catch (e) {
      console.error(e);
      // throw e;
    }
    console.log('query: ' + query)
    console.log('fetching data3:' + JSON.stringify( result.text() ))
    return result.json();
  }

}
