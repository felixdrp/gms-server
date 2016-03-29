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

// https://dev.twitter.com/oauth/overview/creating-signatures
// Tweet token 1 step
//

    var signComponents1 = {
      oauth_consumer_key: "AntPzHq9fsnTPbbaP0nrwngJt",
      oauth_nonce: "69e3594f96e53f1a23bd8e5cea3cb0fc",
      // oauth_signature: "puHy3%2BFnuOJqRTveYcv8pQWzn%2BM%3D",
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: Date.now().toString().slice(0, -3),
      oauth_version: "1.0",
    }
    var parameterString = Object.keys(signComponents1).sort().reduce(
      (prev, curr) => { return prev  + '&' + encodeURIComponent(curr) + '=' + encodeURIComponent(signComponents1[curr]) }, ''
    )
    // parameterString = 'include_entities=true' + parameterString;
    parameterString = parameterString.substring(1);
    console.log(parameterString)

    // Tweet token 2 step
    var signatureBase = 'POST&' + encodeURIComponent('https://api.twitter.com/oauth/request_token') + '&' + encodeURIComponent(parameterString);
    var test2 = 'POST&https%3A%2F%2Fapi.twitter.com%2Foauth%2Frequest_token&oauth_consumer_key%3DAntPzHq9fsnTPbbaP0nrwngJt%26oauth_nonce%3D69e3594f96e53f1a23bd8e5cea3cb0fc%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1458429951%26oauth_version%3D1.0'
    console.log(signatureBase == test2)

    // Tweet token 3 step

    var customerSecret = 'z3cbkta9cgkzTOmxREHcoGa8NRaaDXsSk5TfHVpOLkXEEYzmbU';
    var keySecret = encodeURIComponent( customerSecret ) + '&';
    var hash = crypto.createHmac('SHA1', keySecret).update(signatureBase).digest('base64')

    console.log('oauth_signature:"' + encodeURIComponent( hash ) + '"')
    console.log('oauth_signature:"puHy3%2BFnuOJqRTveYcv8pQWzn%2BM%3D"')


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

  // Return a random code to use in the oauth_nonce
  // More info:
  // https://dev.twitter.com/oauth/overview/authorizing-requests
  getOAuthNonce( data = {} ) {
    // The size of the response.
    let size = data.size || 42,
        // The codification: 2 binary, 8 octal, 16 hex, 36 number and alphabet
        codification = data.codification || 36;
    return Array( size )
            .fill(0)
            .reduce(
              prev =>
                prev +
                Math.floor( Math.random() * codification ).toString( codification )
            );
  }

}
