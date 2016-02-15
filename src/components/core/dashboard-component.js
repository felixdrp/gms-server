import React from 'react'
import { Link } from 'react-router'
import TopHeaderMenuContainer from './top-header-menu-container'

var Dashboard = React.createClass({
  statics: {
    customMethod: function(foo) {
      console.log(this.props);
      return foo === 'bar';
    }
  },
  render() {
    let props = this.props;
    return (
      <div id="dashboard">
        <div className="main-header">
          <TopHeaderMenuContainer {...this.props} />
        </div>

        <div className="main-viewport">

          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: '1 100%'}}>

            <div className="center" >
              <h1>GMS</h1>

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
                  <div style={{position: 'relative', lineHeight: 0, whiteSpace: 'nowrap'}}>
                    <div id="search-query" style={{}}>
                      <input
                        type="text"
                        name="q"
                        maxLength="2048"
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
          </div>
        </div>

        <div className="main-footer" style={{height: 40, padding: '0 10px'}}>
        </div>
      </div>
    );
  }
});

export default Dashboard
