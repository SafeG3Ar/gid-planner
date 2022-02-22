import React from 'react';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import UserAgenda from '../components/UserAgenda';
import UserCalendar from '../components/UserCalendar';

/** A simple static component to render some text for the landing page. */
class UserDashboard extends React.Component {
  render() {
    const primary = grey[100];
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
        <UserAgenda/>
        <UserCalendar/>
      </Box>
    );
  }
}

export default UserDashboard;
