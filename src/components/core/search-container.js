import React from 'react'
import { Link } from 'react-router'
import TopHeaderMenuContainer from './top-header-menu-container'
import SearchCompact from './search-compact'

var SearchContainer = React.createClass({
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
          <div className="header-search-menu">
            <span className="title"><Link to="/">GMS</Link></span>
            <SearchCompact {...this.props} />
          </div>

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

const SearchResultContainer = (props) => (
 <div id="searchResultContainer">
   {props.children}
 </div>
);

export default SearchContainer
