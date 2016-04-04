import crypto from 'crypto'

export default class OAuth {
  constructor(type) {

  }

  // Return a random code to use in the oauth_nonce
  // More info:
  // https://dev.twitter.com/oauth/overview/authorizing-requests
  getOAuthNonce( data = {} ) {
    // The size of the response.
    let size = data.size || 42,
        // The codification: 2 binary, 8 octal, 16 hex, 36 number and alphabet
        codification = data.codification || 36,
        codec = () => Math.floor( Math.random() * codification ).toString( codification );
    return Array( size )
            .fill( codec() )
            .reduce( prev => prev + codec() );
  }


  // Sign for the oauth protocol.
  sign( data = {} ) {
    let header = data.header || {},
        customerSecret = data.customerSecret || '',
        accessTokenSecret = data.accessTokenSecret || '';

    // https://dev.twitter.com/oauth/overview/creating-signatures
    // Tweet token 1 step
    //

    var signComponents1 = {
      oauth_consumer_key: header.oauth_consumer_key || '',
      oauth_nonce: header.oauth_nonce || '',
      oauth_signature_method: header.oauth_signature_method || "HMAC-SHA1",
      oauth_timestamp: header.oauth_timestamp || Date.now().toString().slice(0, -3),
      oauth_version: header.oauth_version || "1.0",
    }

    // If it has the callback, to add callback.
    if ( header.oauth_callback ) {
      signComponents1 = {
        ...signComponents1,
        oauth_callback: header.oauth_callback,
      }
    }

    // If it has the token, to add token.
    if ( data.token ) {
      signComponents1 = {
        ...signComponents1,
        oauth_token: data.token,
      }
    }

    // If it has a query, to add query.
    if ( data.query ) {
      signComponents1 = {
        ...signComponents1,
        ...data.query,
      }
    }

    // If it has a body, to add body.
    if ( data.body ) {
      signComponents1 = {
        ...signComponents1,
        ...data.body,
      }
    }

    // console.log(signComponents1)

    var parameterString = Object.keys( signComponents1 ).sort().reduce(
      (prev, curr) => {
        return prev  + '&' + encodeURIComponent(curr) + '=' + encodeURIComponent(signComponents1[curr])
      }, ''
    )
    // parameterString = 'include_entities=true' + parameterString;
    // Remove the first char &
    parameterString = parameterString.substring(1);
    // console.log(parameterString)

    // Tweet token 2 step
    var signatureBase = data.http_method + '&' + encodeURIComponent( data.url ) + '&' + encodeURIComponent(parameterString);
    // var test2 = 'POST&https%3A%2F%2Fapi.twitter.com%2Foauth%2Frequest_token&oauth_consumer_key%3DAntPzHq9fsnTPbbaP0nrwngJt%26oauth_nonce%3D69e3594f96e53f1a23bd8e5cea3cb0fc%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1458429951%26oauth_version%3D1.0'
    // console.log(signatureBase == test2)

    // Tweet token 3 step

    var keySecret = encodeURIComponent( customerSecret ) + '&' + encodeURIComponent( accessTokenSecret );
    var hash = crypto.createHmac('SHA1', keySecret).update(signatureBase).digest('base64')

    // console.log('oauth_signature:"' + encodeURIComponent( hash ) + '"')
    // console.log('oauth_signature:"puHy3%2BFnuOJqRTveYcv8pQWzn%2BM%3D"')

    return encodeURIComponent( hash );
  }

}
