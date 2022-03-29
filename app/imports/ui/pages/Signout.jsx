import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
      <Container text textAlign='center'>
        <Grid.Column width={9}>
          <Header as='h1'>Thank you for using GID!</Header>
          <Header as='h3'><i>Come back soon.</i></Header>
          <Container textAlign='center'>
            <Button.Group>
              <Button size="medium" as={Link} to='/'>Home Page</Button>
              <Button.Or />
              <Button size="medium" as={Link} to='/login'>Log Back In</Button>
            </Button.Group>
          </Container>
        </Grid.Column>
      </Container>
    </Grid>
  );
};
export default SignOut;
