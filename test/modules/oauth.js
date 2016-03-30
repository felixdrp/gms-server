var should = require('chai').should();
var OAuth = require('../../build/oauth/oauth.js');

describe('oAuth', function () {
  it('fails creating nameless schema', function () {
    (function () {
      new Schema();
    }).should.throw();
  });
  it('oauth nonce default size is 42', function () {
    var oauthobj = new OAuth.default();
    oauthobj.getOAuthNonce().length.should.equal(42);
  });

});
