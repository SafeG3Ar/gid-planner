import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
// import { withRouter, NavLink } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
// import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    // const menuStyle = { marginBottom: '10px' };
    // this is creating a theme
    // const theme = createTheme({
    //   palette: {
    //     primary: '#651fff',
    //     secondary: '#4dabf5',
    //   },
    // });
    return (
      <Box sx={{ width: '100%' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h2" component="div" > This is the app. </Typography>
            {/* <IconButton size="large"
              aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton> */}
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
