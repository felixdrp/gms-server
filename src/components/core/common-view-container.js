import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import qs from 'qs'
import TopHeaderMenuContainer from './top-header-menu-container'
import SearchCompact from './search-compact'

/**
 * Component that renders the common view. The top header and the bottom foot.
 *
 */

var CommonViewContainer = React.createClass({
  statics: {
    customMethod: function(foo) {
      console.log(this.props);
      return foo === 'bar';
    }
  },
  render() {
    let props = this.props;
    let query = qs.parse(props.location.search);
    let location = {
      ...props.location,
      query
    }

    return (
      <div id="common-view-page">
        <div className="main-header">
          <div>
            <h2 className="title">Glasgow Memories Server</h2>
          </div>
          <div
            className="header-menu-container"
          >
            <TopHeaderMenuContainer {...this.props} />
          </div>
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
            {props.children}
          </div>
        </div>

        <div className="main-footer" style={{height: 40, padding: '0 10px'}}>
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
export default connect(mapStateToProps)(CommonViewContainer);
