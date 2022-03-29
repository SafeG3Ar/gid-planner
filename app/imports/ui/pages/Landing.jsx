import React from 'react';
import { Button, Container, Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
const Landing = () => (
  <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
    <Container text textAlign='center'>
      <Grid.Column width={9}>
        <Header as='h1'>Welcome to <p>GID PLANNER</p></Header>
        <Header as='h3'><i>Have a task in mind?</i></Header>
        <Header as='h2'>Get it Done with GID!</Header>
        <Container textAlign='center'>
          <Button size="medium" as={Link} to='/Signup'>
            <i>GID Started</i>
          </Button>
        </Container>
      </Grid.Column>
    </Container>
  </Grid>
);

export default Landing;
