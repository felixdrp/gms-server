import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import TopHeaderMenuContainer from './top-header-menu-container'
import SearchCompact from './search-compact'
import PageCommonBottom from './page-common-bottom'

// Used to create the query to fetch data.
import { fragment as TopicFragment } from '../../graphql/topic-type'
import { fragment as StoryFragment } from '../../graphql/story-type'
import { fragment as CommentFragment } from '../../graphql/comment-type'

// Fetch data.
import globalFetch from '../../data-fetch/global-fetch'

import { ADD_TOPIC_LIST } from '../../actions/actions'


var fetcher = new globalFetch();

/**
 * Component that renders the '/' (root) view.
 *
 */

var TopicDashboard = React.createClass({
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
                comments
              }
            }
          }
          ${TopicFragment.definition}
          ${StoryFragment.definition}
         `,
      }
    }
  },

  async fetchData() {
    // Call component own method static: fetchData
    // To retrieve the query to fetch the data needed by the component
    let actionsAndQuery = this.constructor.fetchData(
      {
        // The location information with the url query.
        // Ex. if url "/path?query=raspberry" then location.query = raspberry
        location: this.props.location,

        // Ex. params:
        // if route "/path/:id" and url "/path/3" then params.id = 3
        params: this.props.params
      }
    );
    let data = await fetcher.getData( actionsAndQuery.query );

    actionsAndQuery.actions.forEach(
      (action) => {
        this.props.dispatch({
          type: action.action,
          ...data.data[action.varName]
        });
      }
    )
    console.log( 'algo ' + JSON.stringify(actionsAndQuery.actions) + JSON.stringify(data) )
  },

  componentDidMount() {
    let query = this.props.location.query,
        offset = 0;
    if ( 'offset' in query && parseInt( Number( query.offset ) ) ) {
      offset = parseInt( Number( query.offset ) );
    }

    if (
      // If not exist this.props.topicListPage
      !( this.props.topicListPage ) ||
      !( this.props.topicListPage[offset] ) ||
      !( 'timestamp' in this.props.topicListPage[offset] ) ||
      // Or the timestamp of the topicListPage is out of date.
      ( Date.now() - this.props.topicListPage[offset].timestamp ) > 5000
    ) {
      // Ask for data
      this.fetchData();
      // console.log('hoooolaaaa' + this.props.topicListPage)

    }
    // console.log('hoooolaaaa' + this.props.topicListPage)
  },

  topicItem(topic) {
    let i = 0|0;
    return (
      <div className="topic-list-item">
        <h2 className="title">{topic.title}</h2>
        <div className="stories-list" style={{}}>
          <div className="header">
            Stories
            <hr/>
          </div>
          {topic.urlList.map(
            (story) => (
              <div key={i++} className={'story-item'}>
                <a href={story.url} target={'_blank'}><h3>{ story.title || story.url || '' }</h3></a>
                <h4>{story.story || ''}</h4>
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
          <div
            style={{
              // display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              maxWidth: 600,
            }}
          >
            <div style={{flex: 1}} >
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
export default connect(mapStateToProps)(TopicDashboard);
