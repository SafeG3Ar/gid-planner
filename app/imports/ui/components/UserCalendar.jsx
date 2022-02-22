import React, { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AppBar from '@mui/material/AppBar';
import CalendarPicker from '@mui/lab/CalendarPicker';
import Divider from '@mui/material/Divider';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import moment from 'moment';

const UserCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
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
  );
};

export default UserCalendar;
