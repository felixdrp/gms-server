import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

var SearchCompact = React.createClass({
  statics: {
    customMethod: function(foo) {
      console.log(this.props);
      return foo === 'bar';
    }
  },
  render() {
    let props = this.props;
    let searchQueryValue = 'query';

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

export default connect()(SearchCompact);
