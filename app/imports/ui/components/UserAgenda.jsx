import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const UserAgenda = () => (
  <Paper elevation={8}>
    <AppBar position="static" style={{ background: '#3f51b5' }}>
      <div align="right">
        <IconButton
          size="large"
          color="inherit"
        >
          <AddCircleIcon />
        </IconButton>
      </div>
      <Toolbar>
        <List>
          <ListItem disablePadding>
            <Typography variant="h5">Today</Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography variant="subtitle1" ><p>{new Date().toDateString()}</p></Typography>
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
    {/* This is the Tomorrow List */}
    <AppBar position="static" style={{ background: '#3f51b5' }}>
      <Toolbar>
        <Typography variant="h5">Tomorrow</Typography>
      </Toolbar>
    </AppBar>
    {/* Current Date or Select Date Shown Here */}
    {/* Here the scheduled to do tasks will be shown in accordance to the selected date */}
  </Paper>
);

export default UserAgenda;
