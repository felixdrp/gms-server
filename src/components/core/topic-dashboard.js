import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import TopHeaderMenuContainer from './top-header-menu-container'
import SearchCompact from './search-compact'

// Fetch data.
import { getTopicList } from '../../data-fetch/data-fetch'

/**
 * Component that renders the '/' (root) view.
 *
 */

var Dashboard = React.createClass({
  statics: {
    fetchData() {
      return '{topicList(amount:1){...TopicFragment,urlList{url}}} fragment TopicFragment on Topic {id,title}';
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
      <div id="topicDashboard">
        <div className="main-header">
          <TopHeaderMenuContainer {...this.props} />
        </div>

        <div className="main-viewport">
          <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 600,
                  }}
          >
            <div className="" style={{flex: 1}} >
              <h3>Topic list</h3>
              {'hola' || this.topicItem()}
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
