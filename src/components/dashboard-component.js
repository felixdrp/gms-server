import React from 'react'
import { Link } from 'react-router'

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
  render() {
    let props = this.props;
    return (
      <div id="dashboard">
        <div className="main-header">
        </div>

        <div className="main-viewport">
          <h4>GMS</h4>

          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{ }}>
              <ul>
                <li style={styles.link}><Link to="/" >Home</Link></li>
                <li style={styles.link}><Link to="/collections" activeStyle={styles.activeLink}>Collections</Link></li>

              </ul>
            </div>

            <div style={{margin: 20}}>
              {props.location.pathname}
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
