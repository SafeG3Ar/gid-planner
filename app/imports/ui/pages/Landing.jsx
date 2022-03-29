import React from 'react';
import { Button, Container, Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
const Landing = () => (
  <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
    <Container text textAlign='center'>
      <Grid.Column width={9}>
        <Header as='h1'>Welcome to <p>GID PLANNER</p></Header>
        <Header as='h3'><i>Have a task in mind? Get it Done with GID!</i></Header>
        <Header as='h2'>Let us GID started</Header>
        <Container textAlign='center'>
          <Button.Group>
            <Button size="medium" as={Link} to='/login'>Sign In</Button>
            <Button.Or />
            <Button size="medium" as={Link} to='/signup'>Register</Button>
          </Button.Group>
        </Container>
      </Grid.Column>
    </Container>
  </Grid>
);

export default Landing;
