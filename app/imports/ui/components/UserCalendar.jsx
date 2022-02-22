import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CalendarPicker from '@mui/lab/CalendarPicker';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import moment from 'moment';

const UserCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const primary = grey[100];
  // {const showDate = moment(selectedDate).format('MM/DD/YYYY');}
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 400,
          height: 700,
          backgroundColor: primary,
        },
      }}
      justifyContent="center"
    >
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
      <Paper elevation={8}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CalendarPicker
            date={selectedDate}
            onChange={date => setSelectedDate(date)} />
        </LocalizationProvider>
        <Divider />
        <AppBar position="static" style={{ background: '#3f51b5', alignItems: 'center' }}>
          <Toolbar variant="dense">
            <Typography variant="h4">{moment(selectedDate).format('MMMM DD, YYYY')}</Typography>
          </Toolbar>
        </AppBar>
        <Divider />
        {/* Current Date or Select Date Shown Here */}
        {/* Here the scheduled to do tasks will be shown in accordance to the selected date */}
      </Paper>
    </Box>
  );
};

export default UserCalendar;
