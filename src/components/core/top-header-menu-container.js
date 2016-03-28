import React from 'react'
import { Link } from 'react-router'

/**
 * Component that renders the top header menu.
 *
 */

var TopHeaderMenuContainer = React.createClass({
  statics: {
    customMethod: function(foo) {
      console.log(this);
      return foo === 'bar';
    }
  },
  render() {
    let props = this.props;
    return (
      <div className="top-header-menu-container">
        <div className="menu">
          <ul style={{}}>
            <li className="top-header-menu">
              <Link
                to="/topicList"
                activeClassName="active-location"
              >
                Topic list
              </Link>
            </li>

            <li className="top-header-menu">
              <Link
                to="/login"
                activeClassName="active-location"
              >
                Login
              </Link>
            </li>
            <li className="top-header-menu">
              <Link
                to="/signup"
                activeClassName="active-location"
              >
                Signup
              </Link>
            </li>

{
  // <li className="top-header-menu">
  //   <Link
  //     to="/summary"
  //     // On url share the same path, Active inline-styles or CSS class.
  //     activeStyle={{
  //       // color: 'red'
  //     }}
  //     activeClassName="active-location"
  //   >
  //     Summary
  //   </Link>
  // </li>
}
          </ul>
        </div>
      </div>
    );
  }
});

export default TopHeaderMenuContainer
