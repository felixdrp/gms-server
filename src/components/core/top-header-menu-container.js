import React from 'react'
import { Link } from 'react-router'
// import Two from './two-component'

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
          <li className="top-header-menu"><Link to="/" >Home</Link></li>
          <li className="top-header-menu">
            <Link
              to="/collections"
              activeStyle={{color: 'red'}}
              activeClassName="mlk"
            >
              Collections
            </Link>
          </li>
        </ul>
      </div>
    );
  }
});

export default TopHeaderMenuContainer
