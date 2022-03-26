import React from 'react';
import { Form, Segment } from 'semantic-ui-react';
import { Container } from '@mui/material';
// import { Meteor } from 'meteor/meteor';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a segment for the security settings See pages/EditProfile.jsx. */
class Verify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    };
  }

  handleChange = (e, { name, value }) => {
    // console.log(name, value);
    this.setState({ [name]: value });
  }

  // Handle Signin submission using Meteor's account mechanism.
  /*
  submit = () => {
    const { code } = this.state;
    Meteor.loginWithPasswordAnd2faCode(username, password, code, error => {
      if (error) {
        console.error('Error trying to log in (user with 2fa)', error);
      }
    });
  }
*/
  render() {
    // sets state variable to a boolean depending on which box is checked
    // Submit method that will lead to another page that will allow two-factor authentication
    return (
      <div>
        <Container>
          <Form onSubmit={this.submit}>
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
        </Container>
      </div>
    );
  }
}

// Buffer.from(svg).toString('base64')

/*
// Require a document to be passed to this component.
Verify.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
*/
// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Verify);
