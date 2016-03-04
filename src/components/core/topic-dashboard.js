import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import TopHeaderMenuContainer from './top-header-menu-container'
import SearchCompact from './search-compact'

// Used to create the query to fetch data.
import { fragment as TopicFragment } from '../../graphql/topic-type'


// Fetch data.
import globalFetch from '../../data-fetch/global-fetch'

var fetcher = new globalFetch();



/**
 * Component that renders the '/' (root) view.
 *
 */

var Dashboard = React.createClass({
  statics: {
    fetchData( location ) {
      let offset = 0;
      if ( location && location.query ) {
        offset = location.query.offset || 0;
      }

      return {
        action: 'add_topic_list',
        query: `
          {
            topicList(offset:"${offset}") {
              offset,
              timestamp,
              topics {
                ...${TopicFragment.name},
                urlList {
                  url
                }
              }
            }
          }
          ${TopicFragment.definition}
         `,
      }
    }
  },

  fetchData() {

    console.log( fetcher.getData( this.constructor.fetchData( this.props.location ).query ) );
    // return fetcher.getData( this.constructor.fetchData( this.props.location ).query );

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
              <div onClick={ () => this.fetchData() }>
              {'hola' || this.topicItem()}
              </div>
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
