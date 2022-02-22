import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const UserAgenda = () => (
  /** This is the TODAY List  */
  <Paper elevation={8}>
    <AppBar position="static" style={{ background: '#3f51b5' }}>
      <div align="left">
        <IconButton
          size="right"
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
    <List
      sx={{
        width: '100%',
        maxWidth: 400,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 265,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {[0, 1, 2, 3, 4].map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
            {[0, 1, 2].map((item) => (
              <ListItem key={`item-${sectionId}-${item}`}>
                <ListItemText primary={`Item ${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>

    {/* This is the TOMORROW List */}
    <AppBar position="static" style={{ background: '#3f51b5' }}>
      <Toolbar>
        <Typography variant="h5">Tomorrow</Typography>
      </Toolbar>
    </AppBar>
    <List
      sx={{
        width: '100%',
        maxWidth: 400,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 265,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {[0, 1, 2, 3, 4].map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
            {[0, 1, 2].map((item) => (
              <ListItem key={`item-${sectionId}-${item}`}>
                <ListItemText primary={`Item ${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  </Paper>
);

export default UserAgenda;
