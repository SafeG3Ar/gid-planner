import React from 'react';
import { Grid } from 'semantic-ui-react';
import UserAgenda from '../components/UserAgenda';
import UserCalendar from '../components/UserCalendar';

/** A simple component to render the components of the user dashboard. */
const UserDashboard = () => (
  <Grid id='user-dashboard' verticalAlign='middle' columns={2}>
    <Grid.Row>My Dashboard</Grid.Row>
    <Grid.Row>
      <Grid.Column>
        <UserAgenda/>
      </Grid.Column>
      <Grid.Column>
        <UserCalendar/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default UserDashboard;
