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
      console.log(this);
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

          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{ }}>
              <h4>GMS</h4>
              <form action="search">
                <input type="text" name="q" />
                <button value="Search" name="bt-search" type="submit">
                  Search
                </button>
              </form>
            </div>

            <div style={{margin: 20}}>
              {props.location.pathname}
              {props.children}
            </div>

          </div>
        </div>

        <div className="main-footer">
        </div>
      </div>
    );
  }
});

export default Dashboard
