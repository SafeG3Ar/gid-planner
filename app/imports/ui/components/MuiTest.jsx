import React from 'react';
// import PropTypes from 'prop-types';
// import { Meteor } from 'meteor/meteor';
// import { withTracker } from 'meteor/react-meteor-data';
// import { withRouter } from 'react-router-dom';
// import { withRouter, NavLink } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
// import Person from '@mui/icons-material/Person';
import { Person } from '@material-ui/icons';
// import { Roles } from 'meteor/alanning:roles';

const useStyles = makeStyles({
  button: {
    color: 'white',
    backgroundColor: 'black',
  },
});
/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
const MuiTest = () => {
  const classes = useStyles();
  return (
    <Button
      className={classes.button}
      variant='contained'
      size='large'
      startIcon={<Person />}
    >
        Material UI
    </Button>
  );
};
export default MuiTest;
