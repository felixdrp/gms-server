/**
 * Module to Facade the data fetch from server and client.
 *
 *
 * Example usage:
 * ```

 *
 * ```
 */

import https from 'https'
import crypto from 'crypto'

export default class TwitterOAuth {
  constructor(type) {
    this.optionsBase = {
      host: 'api.twitter.com',
      port: 443,
      method: 'POST',
    };

    this.optionsRequest = ( authorization ) => {
      let auth = authorization || 'OAuth oauth_consumer_key="AntPzHq9fsnTPbbaP0nrwngJt", oauth_nonce="69e3594f96e53f1a23bd8e5cea3cb0fc", oauth_signature="puHy3%2BFnuOJqRTveYcv8pQWzn%2BM%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1458429951", oauth_version="1.0"';
      return {
        ...this.optionsBase,
        path: '/oauth/request_token',
        headers: {
          'Authorization': auth
        }
      }
    };

    this.optionsAuthenticate = ( authorization ) => {
      let auth = authorization || 'OAuth oauth_consumer_key="AntPzHq9fsnTPbbaP0nrwngJt", oauth_nonce="69e3594f96e53f1a23bd8e5cea3cb0fc", oauth_signature="puHy3%2BFnuOJqRTveYcv8pQWzn%2BM%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1458429951", oauth_version="1.0"';
      return {
        ...this.optionsBase,
        method: 'GET',
        path: '/oauth/authenticate',
        headers: {
          'Authorization': auth
        }
      }
    };

    this.options_other = ( authorization ) => {
      let auth = authorization || 'OAuth oauth_consumer_key="AntPzHq9fsnTPbbaP0nrwngJt", oauth_nonce="69e3594f96e53f1a23bd8e5cea3cb0fc", oauth_signature="puHy3%2BFnuOJqRTveYcv8pQWzn%2BM%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1458429951", oauth_version="1.0"';
      return {
        ...this.optionsBase,
        method: 'GET',
        path: '/oauth/authenticate',
        headers: {
          'Authorization': auth
        }
      }
    };




    var signComponents2 = {
      method: 'POST',

    }

    this.client = ( authorization ) => {
      return new Promise(
        (resolve, reject) => {
          https.request(
              this.optionsRequest( authorization ),
              ( response ) => {
                var data = '';
                response.on('data', function (chunk) {
                  data += chunk;
                });

                response.on('end', function () {
                  console.log('tweet X-D: ' + data);
                  resolve( data );
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
