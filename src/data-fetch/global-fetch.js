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

import http from 'http'

export default class GlobalFetch {
  constructor(type) {
    this.type = type || 'client';
    // Create a different fetch for server and client
    if (type === 'server') {
      // Server fetching data .
      // Change host and port if the server change in the future
      this.options = (query) => {
        return {
          host: 'localhost',
          port: 8009,
          method: 'GET',
          path: '/graphql?query=' + escape( query ),
        }
      };
    } else {
      // Client Fetching data.
      this.options = (query) => {
        return {
          host: location.hostname,
          port: location.port,
          method: 'GET',
          path: '/graphql?query=' + escape( query ),
        }
      };
    }

    this.client = (query) => {
      return new Promise(
        (resolve, reject) => {
          http.request(
              this.options( query ),
              ( response ) => {
                var data = '';
                response.on('data', function (chunk) {
                  data += chunk;
                });

                response.on('end', function () {
                  console.log('X-D: ' + data);
                  resolve( JSON.parse(data) );
                });
              }
            )
            .end();
        }
      );
    };
  }

  async getData(query) {
    let result = {};

    try {
      result = await this.client( query );
    }
    catch (e) {
      console.error(e);
    }

    return result;
  }

}
