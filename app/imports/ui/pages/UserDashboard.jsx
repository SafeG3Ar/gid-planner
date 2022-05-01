import React from 'react';
import { Divider, Grid, Header, Icon } from 'semantic-ui-react';
import UserAgenda from '../components/UserAgenda';
import UserLists from '../components/UserLists';
import UserCalendar from '../components/UserCalendar';

/** A simple component to render the components of the user dashboard. */
const UserDashboard = () => (
  <Grid id='user-dashboard' columns={2}>
    <Grid.Row>
      <Header as='h1'>
        <Icon name='home' />
        <Header.Content>
      My Dashboard
          {/* This will change in accordance to what navbar is selected */}
          <Header.Subheader>Agenda</Header.Subheader>
        </Header.Content>
      </Header>
    </Grid.Row>
    <Divider/>
    <Grid.Row stretched>
      <Grid.Column>
        <UserAgenda/>
        <UserLists/>
      </Grid.Column>
      <Grid.Column>
        <UserCalendar/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default UserDashboard;
