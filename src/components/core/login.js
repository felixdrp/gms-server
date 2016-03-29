import React from 'react';
// import ReactMixin from 'react-mixin';
// import Auth from '../services/AuthService'

export default class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      user: '',
      password: ''
    };
  }

  linkState(data) {

  }

  login(e) {
    e.preventDefault();
    // Auth.login(this.state.user, this.state.password)
    //   .catch(function(err) {
    //     alert("There's an error logging in");
    //     console.log("Error logging in", err);
    //   });
  }

  render() {
    return (
      <div className="login jumbotron center-block">
        <h1>Select a login method</h1>

        <h2>External Login</h2>

        <div>
          <a href="/login/twitter">
            <img
              src="https://g.twimg.com/dev/sites/default/files/images_documentation/sign-in-with-twitter-gray.png"
              alt="Sign in with Twitter" title="Sign in with Twitter"
            />
          </a>
        </div>

        <h2>Local Login</h2>

        <form role="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" valueLink={this.linkState('user')} className="form-control" id="username" placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-default" onClick={this.login.bind(this)}>Submit</button>
      </form>
    </div>
    );
  }
}
