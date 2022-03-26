import React, { useState } from 'react';
import { Divider, Header, Segment } from 'semantic-ui-react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CalendarPicker from '@mui/lab/CalendarPicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';

const UserCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <Segment id="user-calendar" padded='very' raised>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CalendarPicker
          date={selectedDate}
          onChange={date => setSelectedDate(date)}
          inverted
        />
      </LocalizationProvider>
      <Header attached='top'as='h1'>{moment(selectedDate).format('MMMM DD, YYYY')}</Header>
      <Divider />
    </Segment>
  );
};

export default UserCalendar;
