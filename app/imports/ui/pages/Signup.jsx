import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '../../api/profile/ProfileCollection';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', firstName: '', lastName: '', owner: '', phone: '', error: '', redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  // Idea sourced from https://www.codegrepper.com/code-examples/javascript/javascript+check+if+string+contains+capital+letter
  // function that checks the string parameter to see if it has both uppercase and lowercase letters.
  // Returns true if yes, and false if no.
  hasCapitalLetter(str) {
    return /[a-z]/.test(str) && /[A-Z]/.test(str);
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { firstName, lastName, owner, phone, email, password } = this.state;
    const auth = false;
    if (!(password.includes('!') || password.includes('#') || password.includes('*') || password.includes('$'))) {
      swal('Your password is missing a special character', 'Please try again.');
    } else if (!(password.includes(1) || password.includes(2) || password.includes(3) || password.includes(4) || password.includes(5) ||
      password.includes(6) || password.includes(7) || password.includes(8) || password.includes(9))) {
      swal('Your password is missing a number', 'Please try again.');
    } else if (!this.hasCapitalLetter(password)) {
      swal('Your password needs a capital letter', 'Please try again.');
    } else {
      // Need to insert info into new profile and create a user account.
      Accounts.createUser({ username: owner, email, password, profile: { firstName: firstName, lastName: lastName, phone: phone, auth: false } }, (err) => {
        if (err) {
          this.setState({ error: err.reason });
        } else {
          Profiles.collection.insert({ email, firstName, lastName, phone, auth, owner },
            (error) => {
              if (error) {
                swal('Error', error.message, 'error');
              } else {
                this.setState({ error: '', redirectToReferer: true });
              }
            });
        }
      });
    }
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/user-dashboard' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from} />;
    }
    return (
      <Container id="signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Register your account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="First name"
                  id="signup-form-first-name"
                  name="firstName"
                  placeholder="First name"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Last Name"
                  id="signup-form-last-name"
                  name="lastName"
                  placeholder="Last name"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Username"
                  id="signup-form-username"
                  name="owner"
                  placeholder="Enter username"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Phone Number"
                  id="signup-form-phone"
                  icon="phone"
                  iconPosition="left"
                  name="phone"
                  placeholder="Phone number"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signup-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Button id="signup-form-submit" content="Submit" />
              </Segment>
            </Form>
            <Message>
              Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
