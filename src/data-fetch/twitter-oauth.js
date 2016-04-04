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
import OAuth from '../oauth/oauth'

export default class TwitterOAuth {
  constructor( data = {} ) {
    this.optionsBase = {
      host: 'api.twitter.com',
      port: 443,
      method: 'POST',
    };

    this.customerSecret = data.customerSecret || '';
    this.consumerKey = data.consumerKey || '';
    this.oauth_token = null;
    this.accessTokenSecret = null;
    this.oauth_callback = 'http://127.0.0.1:8009/';
    // this.oauth_callback = encodeURIComponent('http://localhost:8009/');

    this.optionsRequestToken = ( data ) => {
      let header = data.header;
      let auth =
        'OAuth oauth_consumer_key="' + header.oauth_consumer_key + '", ' +
        'oauth_nonce="' + header.oauth_nonce + '", ' +
        'oauth_signature="' + header.oauth_signature + '", ' +
        'oauth_callback="' + encodeURIComponent( this.oauth_callback ) + '", ' +
        'oauth_signature_method="HMAC-SHA1", oauth_timestamp="' + header.oauth_timestamp + '", oauth_version="1.0"';
      return {
        ...this.optionsBase,
        path: '/oauth/request_token',
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

  }

  httpsClient = ( options ) => {
    return new Promise(
      (resolve, reject) => {
        https.request(
          options,
          ( response ) => {
            let data = '';

            response.on('data', chunk => data += chunk );

            response.on('end', () => {
              console.log( 'Twitter oAuth: ' + data );
              resolve( data );
            });
          }
        )
        .end();
      }
    );
  };

  async requestToken() {
    let result = {},
        oauth = new OAuth(),
        customerSecret = this.customerSecret,
        header = {
          oauth_consumer_key: this.consumerKey,
          oauth_nonce: oauth.getOAuthNonce( {size: 32, codification: 16} ),
          oauth_signature_method: "HMAC-SHA1",
          oauth_timestamp: Date.now().toString().slice(0, -3),
          oauth_version: "1.0",
          oauth_callback: this.oauth_callback,
        };

    try {
      result = await this.httpsClient(
        // The options to make a http call for request a token.
        this.optionsRequestToken({
          header: {
            ...header,
            oauth_signature: oauth.sign({
              http_method: 'POST',
              url: 'https://api.twitter.com/oauth/request_token',
              customerSecret: customerSecret,
              header
            })
          }
        })
      );
    }
    catch (e) { console.error(e); }

    this.oauth_token = /oauth_token\=([0-z\-]+)(?=\&)/.exec( result )[1];
    this.accessTokenSecret = /oauth_token_secret\=([0-z]+)(?=\&)/.exec( result )[1];
    // Check if  oauth_callback_confirmed=true

    if ( !Boolean( /oauth_callback_confirmed=(true)/.exec('oauth_callback_confirmed=true')[1] ) ) {
      console.warn('oauth_callback_confirmed=false');
    }

    return { requestToken: this.oauth_token, requestTokenSecret: this.accessTokenSecret };
  }

  headerAuthenticate( data = {} ) {
    // let auth = authorization || 'OAuth oauth_consumer_key="AntPzHq9fsnTPbbaP0nrwngJt", oauth_nonce="69e3594f96e53f1a23bd8e5cea3cb0fc", oauth_signature="puHy3%2BFnuOJqRTveYcv8pQWzn%2BM%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1458429951", oauth_version="1.0"';
    let oauth = new OAuth(),
        consumerKey = this.consumerKey || '',
        customerSecret = data.requestTokenSecret || this.accessTokenSecret,
        token = data.requestToken || this.oauth_token,
        tokenSecret = data.requestToken || this.oauth_token,
        timestamp = Date.now().toString().slice(0, -3),
        nonce = oauth.getOAuthNonce( {size: 32, codification: 16} ),
        signature = oauth.sign({
          http_method: 'GET',
          url: 'https://api.twitter.com/oauth/authenticate',
          query: {
            oauth_token: token,
          },
          customerSecret: customerSecret,
          accessTokenSecret: tokenSecret,
          header: {
            oauth_consumer_key: consumerKey,
            oauth_token: token,
            oauth_nonce: nonce,
            oauth_signature_method: "HMAC-SHA1",
            oauth_timestamp: timestamp,
            oauth_version: "1.0",
            oauth_callback: encodeURIComponent( this.oauth_callback ),
          }
        });

    return {
      OAuth: 'oauth_consumer_key="' + consumerKey + '", ' +
             'oauth_token="' + token  + '", ' +
             'oauth_nonce="' + nonce + '", ' +
             'oauth_signature="' + signature + '", ' +
             'oauth_callback="' + encodeURIComponent( this.oauth_callback ) + '", ' +
             'oauth_signature_method="HMAC-SHA1", oauth_timestamp="' + timestamp + '", oauth_version="1.0"'
    };
  }

  async authenticate() {
    // get the request_token

    try {
      var { requestToken, requestTokenSecret } = await this.requestToken();
      // console.log('aaauuuuuuuuu signed '+ JSON.stringify(await this.requestToken()))

    }
    catch (e) { console.error(e); }

    let authenticateHeadersSigned = this.headerAuthenticate( { requestToken, requestTokenSecret } );
    // console.log('aaauuuuuuuuu rtoken '+ requestToken)
// console.log('aaauuuuuuuuu signed '+ JSON.stringify(authenticateHeadersSigned))
    return { requestToken, authenticateHeadersSigned };
  }
}
