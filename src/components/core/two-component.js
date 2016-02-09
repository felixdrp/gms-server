import React from 'react'
import { Link } from 'react-router'

var Two  = React.createClass({
  statics: {
    customMethod: function(foo) {
      return foo === 'bardoooo';
    }
  },
  render() {
    return (
      <div>
        <h4><Link to="/" >GMS</Link></h4>

        Second Page {this.props.location.pathname}
      </div>
    );
  }
});

export default Two
