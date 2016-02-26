import React from 'react'
import { connect } from 'react-redux'
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

  topicItem(topicInfo) {
    return (
      <div>
        <h1>{topicInfo.title}</h1>

        {topicInfo.urlList.map(
          (story) => (
            <div>
              story <a href={story.url}>{story.url} </a>
            </div>
          )
        )}
      </div>
    );
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
              {topicItem}
            </div>
          </div>
        </div>

        <div className="main-footer" style={{}}>
        </div>
      </div>
    );
  }
});

function mapStateToProps(state, ownProps) {
  return {
    // if route contains params
    params: ownProps.params,
    location: ownProps.location
  };
}
export default connect(mapStateToProps)(Dashboard);
