import React from 'react'
import { Link } from 'react-router'
import TopHeaderMenuContainer from './top-header-menu-container'

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
      <div id="search-page">
        <div className="main-header">
          <SearchCompact />
          <TopHeaderMenuContainer {...this.props} />
        </div>

        <div className="main-viewport">
          <div style={{}}>
            <SearchResultContainer data={{}} />
          </div>
        </div>

        <div className="main-footer" style={{height: 40, padding: '0 10px'}}>
        </div>
      </div>
    );
  }
});

export default Dashboard
