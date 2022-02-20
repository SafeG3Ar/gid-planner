import React from 'react';
import UserCalendar from '../components/UserCalendar';

/** A simple static component to render some text for the landing page. */
class UserDashboard extends React.Component {
  render() {
    return (
      <UserCalendar/>
    );
  }
}

export default UserDashboard;
