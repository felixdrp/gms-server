import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

/**
 * Component that renders the search bar.
 *
 */

var SearchCompact = React.createClass({
  statics: {
    customMethod: function(foo) {
      console.log(this.props);
      return foo === 'bar';
    }
  },
  render() {
    let props = this.props;
    // var { query } = props.location;
    let query = '';
    let searchQueryValue = props.location.query.q;

    // To go to another url using the redux and react-router-redux.
    // props.dispatch(routeActions.push('/collections'));

    return (
      <div id="search-compact">
        <form action="search">
          <div style={{
              position: 'relative',
              height: 40,
              overflowX: 'hidden',
              overflowY: 'hidden',
              verticalAlign: 'top',
              whiteSpace: 'nowrap',
              lineHeight: 0,
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        display: 'flex',
                        lineHeight: 0,
                        whiteSpace: 'nowrap',
                      }}
            >
              <div id="search-query" style={{}}>
                <input
                  type="text"
                  name="q"
                  ref={(ref) => this.searchQueryInput = ref}
                  maxLength="2048"
                  defaultValue={searchQueryValue}
                  style={{}}
                />
              </div>
              <button value="Search" name="bt-search" type="submit" style={{height: 40, padding: '0 15px'}}>
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

// Redux react code to map the store with the component props.
// More info about:
// http://redux.js.org/docs/basics/UsageWithReact.html

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.params,
    filter: ownProps.location
  };
}

export default connect(mapStateToProps)(SearchCompact);
