/* eslint-disable indent */
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Meteor } from 'meteor/meteor';
// import { withTracker } from 'meteor/react-meteor-data';
// import { withRouter } from 'react-router-dom';
// import { withRouter, NavLink } from 'react-router-dom';
import {
  alpha, AppBar, Toolbar, Typography,
  InputBase, IconButton, ListItemButton, Collapse,
  List, ListItemText, ListItemIcon,
} from '@mui/material';
import Person from '@mui/icons-material/Person';
import { Search } from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import LoopIcon from '@mui/icons-material/Loop';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import { Roles } from 'meteor/alanning:roles';
import { ExpandLess } from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { grey } from '@mui/material/colors';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
const NavBar2 = () => {
  /** instance to use the style from makeStyles */
  const classes = useStyles();
  // For logging in
    // const { currentUser, isAdmin } = useTracker(() => ({
    // currentUser: Meteor.user()?.username,
    // isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin'),
    // }), []);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
    <AppBar
        sx={{
          color: 'white',
          backgroundColor: grey[100],
          border: '1px solid black',
        }}
    >
        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Typography
          // variant is the type of style and component is the LABEL (like span or h2)
            sx={{
              color: '#3f51b5',
              display: 'block',
              [theme.breakpoints.up('sm')]: {
                display: 'none',
              }
            }}
          variant='h6'>
                  GID</Typography>
        <Typography variant='h6'>
                  GID Planner
              </Typography>
              <div sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: alpha(theme.palette.common.black, 0.15),
        '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
        },
        borderRadius: theme.shape.borderRadius,
  }}>
                  <Search />
                  <InputBase placeholder='Search...'/>
              </div>
        <div className='navbar2-icons'>
          {/* TO ADD BUTTON: +CALENDAR +TO DO */}
          <IconButton
            // mouse over the button and the menu will drop down
            >
            <AddIcon fontSize='medium' />
          </IconButton>
          {/* TO REFRESH BUTTON */}
          <IconButton>
            <LoopIcon fontSize='medium'/>
          </IconButton>
          <IconButton
              // onClick={setVisible}
            >
            <SettingsIcon fontSize='medium'/>
          </IconButton>
          <ListItemButton
            onClick={handleClick}>
              <PersonIcon fontSize='medium' />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
              </div>
      </Toolbar>
      </AppBar>
      {/* <Menu id='user-menu'
        anchorEl={visible}
        open={Boolean(visible)}
      >
        <MenuList >Sign In</MenuList>
    </Menu> */}
    </>
  );
};
export default NavBar2;
