import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import TopHeaderMenuContainer from './top-header-menu-container'
import SearchCompact from './search-compact'

// Used to create the query to fetch data.
import { fragment as TopicFragment } from '../../graphql/topic-type'
import { fragment as StoryFragment } from '../../graphql/story-type'

// Fetch data.
import globalFetch from '../../data-fetch/global-fetch'

import { ADD_TOPIC_LIST } from '../../actions/actions'


var fetcher = new globalFetch();

/**
 * Component that renders the '/' (root) view.
 *
 */

var Dashboard = React.createClass({
  statics: {
    fetchData( { location, params = '' } ) {
      let offset = 0;
      if ( location && location.query ) {
        offset = location.query.offset || 0;
      }

      return {
        actions: [
          {
            action: ADD_TOPIC_LIST,
            varName: 'topicList'
          }
        ],
        query: `
          {
            topicList(offset:"${offset}") {
              offset,
              timestamp,
              topics {
                ...${TopicFragment.name},
                urlList {
                  ...${StoryFragment.name},
                }
              }
            }
          }
          ${TopicFragment.definition}
          ${StoryFragment.definition}
         `,
      }
    }
  },

  fetchData() {

    console.log( fetcher.getData( this.constructor.fetchData( this.props.location ).query ) );
    // return fetcher.getData( this.constructor.fetchData( this.props.location ).query );

  },

  topicItem(topic) {

    return (
      <div>
        <h2>{topic.title}</h2>
        <div  style={{marginLeft: 18}}>
          {topic.urlList.map(
            (story) => (
              <div>
                <h3>{story.title || story.url}</h3>
                <h4>{story.story || ''}</h4>
                <a href={story.url}>{story.url} </a>
              </div>
            )
          )}
        </div>
      </div>
    );
  },

  render() {
    let props = this.props,
        offset = ( props.location.query && 'offset' in props.location.query ) ?
          props.location.query.offset :
          0,
        topicList = [];

    if ( props.topicListPage[offset] && props.topicListPage[offset].topicList.length > 0 ) {
      for (let topic of props.topicListPage[offset].topicList) {
        topicList.push(<div key={ topic.id }>{ this.topicItem( topic ) }</div>)
      }
    } else {
      topicList = 'Topic list is empty at the moment... Please try later.';
    }

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
              { topicList }
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
  // console.log(state, ownProps)
  return {
    // if route contains params
    params: ownProps.params,
    location: ownProps.location,
    // store data.
    topicListPage: state.topicListPage,
  };
}
export default connect(mapStateToProps)(Dashboard);
