import React, { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
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
          width: 500,
          height: 700,
          backgroundColor: primary,
        },
      }}
      justifyContent="center"
    >
      <Paper elevation={8} >
        <LocalizationProvider dateAdapter={AdapterDateFns} >
          <CalendarPicker
            date={selectedDate}
            onChange={date => setSelectedDate(date)}/>
        </LocalizationProvider>
        <Divider />
        <Typography variant="h4" align="center">{moment(selectedDate).format('MMMM DD, YYYY')}</Typography>
        <Divider />
        { /* Current Date or Select Date Shown Here */ }
        { /* Here the scheduled to do tasks will be shown in accordance to the selected date */ }
      </Paper>
    </Box>
  );
};

export default UserCalendar;
