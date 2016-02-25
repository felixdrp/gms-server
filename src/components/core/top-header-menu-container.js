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
      <div id="top-header-menu-container">
        <ul style={{listStyleType: 'none'}}>
          <li className="top-header-menu">{props.location.pathname}</li>
          <li className="top-header-menu"><Link to="/" >Home</Link></li>
          <li className="top-header-menu">
            <Link
              to="/collections"
              // On url share the same path, Active inline-styles or CSS class.
              activeStyle={{
                // color: 'red'
              }}
              activeClassName="active-location"
            >
              Summary
            </Link>
          </li>
        </ul>
      </div>
    );
  }
});

export default TopHeaderMenuContainer
