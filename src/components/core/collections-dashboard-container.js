import React from 'react'
import { Link } from 'react-router'

var CollectionsDashboardContainer = React.createClass({
  statics: {
    customMethod: function(foo) {
      return foo === 'bardoooo';
    }
  },
  render() {
    return (
      <div className="common-view-page-structure-dashboard">
        <div className="vierport-main-list-component">
          <h3><Link to="/" >Twitter</Link></h3>
          <div >

          Second Page {this.props.location.pathname}
          </div>

        </div>
      </div>
    );
  }
});

export default CollectionsDashboardContainer
