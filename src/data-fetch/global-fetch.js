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

import { graphql } from 'graphql'
import Lokka from 'lokka';
import { Transport } from 'lokka-transport-http';

export default class GlobalFetch {
  constructor(type) {
    this.type = type || 'client';
    // Create a different fetch for server and client
    // create a new Lokka client
    if (type === 'server') {
      this.client = graphql;
    } else {
      this.client = new Lokka({
        transport: new Transport('/graphql')
      });
    }
    // console.log(this.client)

    // // Get the initial data from the transport (it's a promise)
    // this.dataPromise = this.client
    //   // invoke the GraphQL query to get all the items
    //   .query(`
    //     {items}
    //   `)
    //   .then(res => res.items);
  }



}
