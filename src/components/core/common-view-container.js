import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import qs from 'qs'
import TopHeaderMenuContainer from './top-header-menu-container'
import SearchCompact from './search-compact'

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
          <div className="header-search-menu">
            <span className="title"><Link to="/">GMS</Link></span>
            <SearchCompact location={props.location} params={props.params} />
          </div>

          <TopHeaderMenuContainer {...this.props} />
        </div>

        <div className="main-viewport">
          {props.children}
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
