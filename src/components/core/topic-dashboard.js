import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import TopHeaderMenuContainer from './top-header-menu-container'
import TopicItemNews from './topic-item-news'
import SearchCompact from './search-compact'
import PageCommonBottom from './page-common-bottom'

// Used to create the query to fetch data.
import { fragment as TopicFragment } from '../../graphql/topic-type'
import { fragment as WordFrequencyFragment } from '../../graphql/word-frequency-type'
import { fragment as StoryFragment } from '../../graphql/story-type'
import { fragment as CommentFragment } from '../../graphql/comment-type'

// Fetch data.
import globalFetch from '../../data-fetch/global-fetch'

import { ADD_TOPIC_LIST } from '../../actions/actions'

// globalFetch used to fetch data from server.

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
                tagWords {
                  ...${WordFrequencyFragment.name},
                },
                urlList {
                  ...${StoryFragment.name},
                },
                comments
              }
            }
          }
          ${TopicFragment.definition}
          ${WordFrequencyFragment.definition}
          ${StoryFragment.definition}
         `,
      }
    }
  },

  getInitialState() {
    return {
      scroll: 'relative'
    };
  },

  componentDidMount() {
    let query = this.props.location.query,
        offset = 0;

    if ( 'offset' in query && parseInt( Number( query.offset ) ) ) {
      offset = parseInt( Number( query.offset ) );
    }

    // Initial position of the browser menu.
    // It will help to maintain fixed the menu in the top of the view.
    this._topicListBrowserMenu._INIT_POSITION = this._topicListBrowserMenu.offsetTop;
    window.addEventListener('scroll', this.handleOnScroll);

    // The client need to fetch Data?
    if (
      // If not exist this.props.topicListPage
      !( this.props.topicListPage ) ||
      !( this.props.topicListPage[offset] ) ||
      // Or the timestamp of the topicListPage is out of date.
      !( 'timestamp' in this.props.topicListPage[offset] ) ||
      ( Date.now() - this.props.topicListPage[offset].timestamp ) > 5000
    ) {
      // Fetch data
      this.fetchData();
    }
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
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
    console.log( 'async fetchData() ' + JSON.stringify(actionsAndQuery.actions) + JSON.stringify(data) )
  },

  handleOnScroll() {
    // console.log(window.scrollY);
    if (
      this.state &&
      'scroll' in this.state &&
      '_topicListBrowserMenu' in this &&
      '_INIT_POSITION' in this._topicListBrowserMenu
    ) {
      if (
        this.state.scroll == 'relative' &&
        window.scrollY >= this._topicListBrowserMenu._INIT_POSITION
      ) {
        this.setState({scroll: 'fixed'});
      }

      if (
        this.state.scroll == 'fixed' &&
        window.scrollY < this._topicListBrowserMenu._INIT_POSITION
      ) {
        this.setState({scroll: 'relative'});
      }
    }
  },

  topMenu( position, show = true ) {
    return (
      <div
        style={{
          display: show? 'flex' : 'none',
          top: 0,
          left: 0,
          position: position || 'relative',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#efefef',
          // paddingBottom: 7,
          boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.39)',
          color: '#777',
          paddingTop: 10,
        }}
      >
        <div>
          <TopHeaderMenuContainer {...this.props} />
        </div>

        <div
          style={{
            display: 'flex',
            position: 'relative',
            top: 3,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fafafa',
            // paddingBottom: 7,
            boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.39)',
            color: '#777',
            padding: 3,
          }}
        >
          <b>
            { ['<',1,2,3,4,5,'>'].map( (i) => <span key={i} style={{padding: '0 10px', cursor: 'pointer'}}>{ i }</span> ) }
          </b>
        </div>
      </div>
    )
  },

  topicItem(topic) {
    let i = 0|0,
        news = topic.urlList || [];

    return (
      <div className="topic-list-item">
        <h2 className="title">{ topic.title || 'Untitled' }</h2>
        <div className="stories-list" style={{}}>
          <div className="header">
            Stories
            <hr/>
          </div>
          {
            news.map(
              (story) => {
                let titleTemporal = story.story.match(/(\w+\s){7}\w+/g);

                if ( titleTemporal && titleTemporal.length > 0 ) {
                  titleTemporal = titleTemporal[0];
                }

                return (
                  <TopicItemNews
                    key={i++}
                    data={{
                      title: story.title || titleTemporal || '' ,
                      url: story.url || '',
                      story: story.story || '',
                    }}
                  />
                );
              }
            )
          }
        </div>
      </div>
    );
  },

  render() {
    let props = this.props,
        state = this.state || {},
        offset = ( props.location.query && 'offset' in props.location.query ) ?
          props.location.query.offset :
          0,
        topicList = [];

    if ( props.topicListPage[offset] && props.topicListPage[offset].topicList.length > 0 ) {
      try {
        for (let topic of props.topicListPage[offset].topicList) {
          topicList.push(<div key={ topic.id }>{ this.topicItem( topic ) }</div>)
        }
      } catch(e) {
        console.warn( ' ERROR: ' + e );
      }
    } else {
      topicList = 'Topic list is empty at the moment... Please try later.';
    }

    return (
      <div id="topicDashboard">
        <div className="main-header">
          <div>
            <h2 className="title">Glasgow Memories Server</h2>
          </div>
          <div ref={ (c) => this._topicListBrowserMenu = c }></div>
            { this.topMenu( 'relative' ) }
            { this.topMenu( 'fixed', state.scroll == 'fixed'? true : false ) }
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
              overflowWrap: 'break-word',
            }}
          >
            <div style={{flex: 1}} >
              <div
                // onClick={
                //   () => this.fetchData()
                // }
              >
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
