/* eslint-disable indent */
import React from 'react';
// import PropTypes from 'prop-types';
// import { Meteor } from 'meteor/meteor';
// import { withTracker } from 'meteor/react-meteor-data';
// import { withRouter } from 'react-router-dom';
// import { withRouter, NavLink } from 'react-router-dom';
import { alpha, AppBar, makeStyles, Toolbar, Typography, InputBase, IconButton, MenuList, Menu } from '@material-ui/core';
// import Person from '@mui/icons-material/Person';
import { Search } from '@material-ui/icons';
import SettingsIcon from '@material-ui/icons/Settings';
import LoopIcon from '@material-ui/icons/Loop';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
// import { Roles } from 'meteor/alanning:roles';
import { grey } from '@material-ui/core/colors';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  app_bar: {
    color: 'white',
    backgroundColor: grey[100],
    border: '1px solid black',
  },
    logoLg: {
      color: '#3f51b5',
      display: 'none',
      [theme.breakpoints.up('sm')]: {
          display: 'block',
      },
  },
    logoSm: {
      color: '#3f51b5',
      display: 'block',
      [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: alpha(theme.palette.common.black, 0.15),
        '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
        },
        borderRadius: theme.shape.borderRadius,
  },
}));
/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
const NavBar2 = () => {
  /** instance to use the style from makeStyles */
  const classes = useStyles();
  // Anchors for the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = (anchorEl);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
    const handleClose = () => {
    setAnchor(null);
  };
 // const [value, setValue] = useState(0);

  return (
    <>
    <AppBar
      className={classes.app_bar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          // variant is the type of style and component is the LABEL (like span or h2)
          className={classes.logoSm}
          variant='h6'>
                  GID</Typography>
        <Typography
          className={classes.logoLg}
                  variant='h6'>
                  GID Planner
              </Typography>
              <div className={classes.search}>
                  <Search />
                  <InputBase placeholder='Search...'/>
              </div>
        <div className='navbar2-icons'>
          {/* TO ADD BUTTON: +CALENDAR +TO DO */}
          <IconButton
            // mouse over the button and the menu will drop down
            onMouseOver={handleClick}>
            <AddIcon fontSize='medium' />
          </IconButton>
          {/* TO REFRESH BUTTON */}
          <IconButton onMouseOver={handleClick}>
            <LoopIcon fontSize='medium'/>
          </IconButton>
          <IconButton
          onMouseOver={handleClick}>
            <SettingsIcon fontSize='medium'/>
          </IconButton>
          <IconButton
            onMouseOver={handleClick}
            aria-controls='user-menu'>
            <PersonIcon fontSize='medium'/>
          </IconButton>
              </div>
      </Toolbar>
      </AppBar>
      <Menu id='user-menu'
        anchorEl={anchorEl}
        open={true}
      >
        <MenuList>Sign In</MenuList>
    </Menu>
    </>
  );
};
export default NavBar2;
