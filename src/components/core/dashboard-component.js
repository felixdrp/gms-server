import React from 'react'
import { Link } from 'react-router'
import TopHeaderMenuContainer from './top-header-menu-container'
import SearchCompact from './search-compact'

/**
 * Component that renders the '/' (root) view.
 *
 */

var Dashboard = React.createClass({
  statics: {
    customMethod: function(foo) {
      console.log(this.props);
      return foo === 'bar';
    }
  },
  render() {
    let props = this.props;
    return (
      <div id="dashboard">
        <div className="main-header">
          <TopHeaderMenuContainer {...this.props} />
        </div>

        <div className="main-viewport">
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div className="" style={{flex: 1}} >
              <h1>GMS</h1>
            </div>

            <div style={{flex: 1, width: 600}}>
              <SearchCompact {...this.props} />
            </div>
          </div>
        </div>

        <div className="main-footer" style={{}}>
        </div>
      </div>
    );
  }
});

export default Dashboard
