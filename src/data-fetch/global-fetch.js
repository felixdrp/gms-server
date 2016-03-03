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
import schema from '../graphql/schema'


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

  async getData(query) {
    let result = {};
    console.log('fetching data1:' + result)
    try {
      if (this.type === 'client') {
        console.log('mlkkk')
        result = await this.client.query('{collections}');
      } else {
        result = await this.client(schema, 'query ' + query);
      }
    }
    catch(e) {
      new Throw(e);
    }
    console.log('query: ' + query)
    console.log('fetching data3:' + JSON.stringify(result))
    return result;
  }

  async a() {
    console.log('await');
    let result = 'mlk'
    result = await b()
    result = await graphql(schema, 'query {collections}');
    result = await graphql(schema, 'query {topicList(amount:1){...TopicFragment,urlList{url}}} fragment TopicFragment on Topic {id,title}');

    console.log("graphql:" + JSON.stringify(result));
  }

}
