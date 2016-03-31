// var should = require('chai').should();
import { should, expect } from 'chai'
import OAuth from '../../build/oauth/oauth.js'

describe('oAuth class', function () {
  describe('oauth_nonce generation', () => {
    let oauthobj = new OAuth(),
        // test with a big string.
        longString = 1e3;

    it('oauth_nonce default size is 42', function () {
      expect( oauthobj.getOAuthNonce() ).to.have.lengthOf(42);
    });

    it('oauth_nonce size is 10', function () {
      expect( oauthobj.getOAuthNonce( {size: 10} ) ).to.have.lengthOf(10);
    });

    it('oauth_nonce default codification is 36', function () {
      expect( oauthobj.getOAuthNonce( {size: longString} ) ).satisfy( nonceCode => RegExp('[0-z]{' + longString + '}').test( nonceCode ) );
    });

    it('oauth_nonce codification is binary', function () {
      expect( oauthobj.getOAuthNonce( {size: longString, codification: 2} ) ).to.satisfy( nonceCode => RegExp('[0-1]{' + longString + '}').test( nonceCode ) );
      expect( oauthobj.getOAuthNonce( {size: longString, codification: 2} ) ).to.not.satisfy( nonceCode => RegExp('[2-z]+').test( nonceCode ) );
    });

    it('oauth_nonce codification is octal', function () {
      expect( oauthobj.getOAuthNonce( {size: longString, codification: 8} ) ).to.satisfy( nonceCode => RegExp('[0-7]{' + longString + '}').test( nonceCode ) );
      expect( oauthobj.getOAuthNonce( {size: longString, codification: 8} ) ).to.not.satisfy( nonceCode => RegExp('[8-z]+').test( nonceCode ) );
    });

    it('oauth_nonce codification is hex', function () {
      expect( oauthobj.getOAuthNonce( {size: longString, codification: 16} ) ).to.satisfy( nonceCode => RegExp('[0-f]{' + longString + '}').test( nonceCode ) );
      expect( oauthobj.getOAuthNonce( {size: longString, codification: 16} ) ).to.not.satisfy( nonceCode => RegExp('[g-z]+').test( nonceCode ) );
    });

    it('oauth_nonce codification is not bigger than 36', function () {
      expect(
        () => {
          oauthobj.getOAuthNonce( {size: longString, codification: 37} );
        }
      ).to.throw('toString() radix argument must be between 2 and 36');
    });

  });
});
