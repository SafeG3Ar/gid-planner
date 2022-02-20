import React, { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { brown } from '@mui/material/colors';

const UserCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const primary = brown[50];

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
      <Paper elevation={8}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CalendarPicker
            date={selectedDate}
            onChange={date => setSelectedDate(date)
            } />
        </LocalizationProvider>
      </Paper>
    </Box>
  );
};

export default UserCalendar;
