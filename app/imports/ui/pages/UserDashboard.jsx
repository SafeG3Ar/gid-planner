import React from 'react';
import { Divider, Grid, Header, Icon } from 'semantic-ui-react';
import UserAgenda from '../components/UserAgenda';
import UserCalendar from '../components/UserCalendar';

/** A simple component to render the components of the user dashboard. */
const UserDashboard = () => (
  <Grid id='user-dashboard' verticalAlign='middle' columns={2}>
    <Grid.Row>
      <Header as='h1'>
        <Icon name='home' />
        <Header.Content>
      My Dashboard
          <Header.Subheader>Agenda</Header.Subheader>
        </Header.Content>
      </Header>
    </Grid.Row>
    <Divider/>
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
