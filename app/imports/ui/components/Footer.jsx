import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
      <footer>
        <div style={divStyle} className="ui center aligned container">
          <hr />
              SafeG3Ar | GID Planner<br />
              Made for ICS 427 - Software Quality Assurance <br />
        </div>
      </footer>
    );
  }
}

export default Footer;
