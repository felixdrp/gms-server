// var should = require('chai').should();
import { should, expect } from 'chai'
import OAuth from '../../build/oauth/oauth.js'

describe('oAuth class', () => {
  describe('oauth_nonce generation', () => {
    let oauth = new OAuth(),
        // test with a big string.
        longString = 1e3;

    it('oauth_nonce default size is 42', () => {
      expect( oauth.getOAuthNonce() ).to.have.lengthOf(42);
    });

    it('oauth_nonce size is 10', () => {
      expect( oauth.getOAuthNonce( {size: 10} ) ).to.have.lengthOf(10);
    });

    it('oauth_nonce default codification is 36', () => {
      expect( oauth.getOAuthNonce( {size: longString} ) )
        .satisfy( nonceCode => RegExp('[0-z]{' + longString + '}').test( nonceCode ) );
    });

    it('oauth_nonce codification is binary', () => {
      expect( oauth.getOAuthNonce( {size: longString, codification: 2} ) ).to.satisfy( nonceCode => RegExp('[0-1]{' + longString + '}').test( nonceCode ) );
      expect( oauth.getOAuthNonce( {size: longString, codification: 2} ) ).to.not.satisfy( nonceCode => RegExp('[2-z]+').test( nonceCode ) );
    });

    it('oauth_nonce codification is octal', () => {
      expect( oauth.getOAuthNonce( {size: longString, codification: 8} ) ).to.satisfy( nonceCode => RegExp('[0-7]{' + longString + '}').test( nonceCode ) );
      expect( oauth.getOAuthNonce( {size: longString, codification: 8} ) ).to.not.satisfy( nonceCode => RegExp('[8-z]+').test( nonceCode ) );
    });

    it('oauth_nonce codification is hex', () => {
      expect( oauth.getOAuthNonce( {size: longString, codification: 16} ) ).to.satisfy( nonceCode => RegExp('[0-f]{' + longString + '}').test( nonceCode ) );
      expect( oauth.getOAuthNonce( {size: longString, codification: 16} ) ).to.not.satisfy( nonceCode => RegExp('[g-z]+').test( nonceCode ) );
    });

    it('oauth_nonce codification is not bigger than 36', () => {
      expect(
        () => {
          oauth.getOAuthNonce( {size: longString, codification: 37} );
        }
      ).to.throw('toString() radix argument must be between 2 and 36');
    });
  });

  describe('oauth sign', () => {
    let oauth = new OAuth(),
        // test with a big string.
        longString = 1e3;

    it('oauth sign request token', () => {
      expect(
        oauth.sign({
          http_method: 'POST',
          url: 'https://api.twitter.com/oauth/request_token',
          customerSecret: 'z3cbkta9cgkzTOmxREHcoGa8NRaaDXsSk5TfHVpOLkXEEYzmbU',
          header: {
            oauth_consumer_key: "AntPzHq9fsnTPbbaP0nrwngJt",
            oauth_nonce: "f6c602a6e0ebc9122f14d1403722e18b",
            oauth_signature_method: "HMAC-SHA1",
            oauth_timestamp: "1459637044",
            oauth_version: "1.0",
          }
        })
      ).to.be.equal("6HNBHnGQER5aeMRfhf8l6J7P9Lc%3D" );
    });

    it('oauth sign authenticate', () => {
      expect(
        oauth.sign({
          http_method: 'GET',
          url: 'https://api.twitter.com/oauth/authenticate',
          query: {
            oauth_token: 'yN_LHwAAAAAAuMyhAAABU912oIU',
          },
          customerSecret: 'z3cbkta9cgkzTOmxREHcoGa8NRaaDXsSk5TfHVpOLkXEEYzmbU',
          accessTokenSecret: 'feTvUCSOya1t4CpU9ixxUebkG5KktcX4',
          header: {
            oauth_consumer_key: "AntPzHq9fsnTPbbaP0nrwngJt",
            oauth_token: "yN_LHwAAAAAAuMyhAAABU912oIU",
            oauth_nonce: "e5cd7cae848a367f3bebd6f611ab5f37",
            oauth_signature_method: "HMAC-SHA1",
            oauth_timestamp: "1459709652",
            oauth_version: "1.0",
          }
        })
      ).to.be.equal('m0YACuywOyXFf1SWx9Jbl8%2FJLrk%3D' );
    });
  });
});
