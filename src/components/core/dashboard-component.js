import React from 'react'
import { Link } from 'react-router'
import TopHeaderMenuContainer from './top-header-menu-container'

const dark = 'hsl(200, 20%, 20%)'
const light = '#777'
const styles = {}

styles.wrapper = {
  padding: '10px 20px',
  // overflow: 'hidden',
  // background: dark,
  color: light
}

styles.link = {
  padding: 5,
  color: light,
  fontWeight: 200
}

styles.activeLink = {
  ...styles.link,
  // background: light,
  color: dark
}

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
                  <div style={{position: 'relative',lineHeight: 0,whiteSpace: 'nowrap'}}>
                    <div id="search-query" style={{}}>
                      <input
                        type="text"
                        name="q"
                        maxLength="2048"
                        style={{
                          border: 'medium none',
                          outline: 'none',
                          padding: 0,
                          margin: 0,
                          height: '100%',
                          width: '100%',
                          fontSize: 16,
                          fontWeight: 400,
                          textIndent: 10,
                        }}
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
