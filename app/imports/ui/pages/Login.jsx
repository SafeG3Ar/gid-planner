import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
// import { Accounts } from 'meteor/accounts-base';
// import { Accounts } from 'meteor/accounts-base';
import { Container, Form, Grid, Header, Message, Segment, Button, Modal, Image } from 'semantic-ui-react';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Login extends React.Component {

  // Initialize component state with properties for login and redirection.
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', error: '', error2: '', open: false, redirectToReferer: false };
  }

  // Update the form controls each time the user interacts with them.
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    console.log(this.state.code);
  }

  // Handle Signin submission using Meteor's account mechanism.
  submit = () => {
    // console.log(Meteor.user.services);
    const { username, password } = this.state;
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        if (error.error === 'no-2fa-code') {
          this.setState({ error2: error.error });
          console.log(error.error);
          this.setState({ open: true });
        }
        console.log(error);
        this.setState({ error: error.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  submit2 = () => {
    const { username, password, code } = this.state;
    console.log(code);
    Meteor.loginWithPasswordAnd2faCode(username, password, code, error => {
      if (error) {
        console.error('Error trying to log in (user with 2fa)', error);
      }
      this.setState({ error: '', redirectToReferer: true });
    });
  }

  // Render the signin form.
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from} />;
    }
    // Otherwise return the Login form.
    return (
      <Container id="signin-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Login to your account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Username"
                  id="signin-form-username"
                  icon="user"
                  iconPosition="left"
                  name="username"
                  type="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signin-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Button id="signin-form-submit" content="Submit" />
              </Segment>
            </Form>
            <Message>
              <Link to="/signup">Click here to Register</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Login was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
        {this.state.error2 === '' ? (
          ''
        ) : (
          <Modal
            onClose={() => this.setState({ open: false })}
            onOpen={() => this.setState({ open: true })}
            open={this.state.open}

          >
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content image>
              <Image size='medium' src='/images/avatar/large/rachel.png' wrapped />
              <Modal.Description>
                <Header>Please Enter Code</Header>
                <Form onSubmit={this.submit2}>
                  <Segment stacked>
                    <Form.Input
                      label="Passcode"
                      id="passcode"
                      icon="user"
                      iconPosition="left"
                      name="code"
                      placeholder="code"
                      onChange={this.handleChange}
                    /><Form.Button id="signin-form-submit" content="Submit" />
                  </Segment>
                </Form>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color='black' onClick={() => this.setState({ open: false })}>
              Nope
              </Button>
              <Button
                content="Yep, that's me"
                labelPosition='right'
                icon='checkmark'
                onClick={() => this.setState({ open: false })}
                positive
              />
            </Modal.Actions>
          </Modal>
        )}
      </Container>
    );
  }
}

// Ensure that the React Router location object is available in case we need to redirect.
Login.propTypes = {
  location: PropTypes.object,
};
