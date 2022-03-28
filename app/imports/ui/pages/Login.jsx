import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Container, Form, Grid, Header, Message, Segment, Modal } from 'semantic-ui-react';

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
    // console.log(this.state.code);
  }

  // Handle Signin submission using Meteor's account mechanism.
  submit = () => {
    const { username, password } = this.state;
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        // if user has 2FA enabled, have modal open to log code.
        if (error.error === 'no-2fa-code') {
          this.setState({ error2: error.error });
          this.setState({ open: true });
        }
        this.setState({ error: error.reason });
        // otherwise, if 2FA not enabled, login as normal.
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  // Second submit for logging in after user enters the 2FA code.
  submit2 = () => {
    const { username, password, code } = this.state;
    Meteor.loginWithPasswordAnd2faCode(username, password, code, error => {
      if (error) {
        swal('Error', error.message, 'Please try again.');
      }
      this.setState({ open: false, error: '', redirectToReferer: true });
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
                  placeholder="Enter your username"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signin-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Button id="signin-form-submit" content="Login" primary />
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
            <Modal.Content>
              <Modal.Description>
                <Header>Enter your 2FA Code</Header>
                <p className='settingsFont'>Make sure that you are able to enter your code before it expires, or you will not be signed in.</p>
                <Form onSubmit={this.submit2}>
                  <Segment stacked style={{ borderRadius: '10px', width: '50%', marginLeft: '25%', marginRight: '25%', boxShadow: '0' }}>
                    <Form.Input
                      label="2FA Login Code"
                      id="logincode"
                      icon="barcode"
                      iconPosition="left"
                      name="code"
                      placeholder="Login Code"
                      onChange={this.handleChange}
                    /><Form.Button id="signin-form-submit" content="Confirm" primary />
                  </Segment>
                </Form>
              </Modal.Description>
            </Modal.Content>
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
