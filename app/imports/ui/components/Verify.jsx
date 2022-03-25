import React from 'react';
import { Divider, Form, FormField, FormGroup, Segment } from 'semantic-ui-react';
import { Button, Container } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Buffer } from 'buffer';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a segment for the security settings See pages/EditProfile.jsx. */
class Verify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      qrCode: null,
    };
  }

  handleChange = (e, { name, value }) => {
    // console.log(name, value);
    this.setState({ [name]: value });
    console.log(this.state.code);
  }

  // Handle Signin submission using Meteor's account mechanism.
  submit = () => {
    Accounts.has2faEnabled('SooFlay', (err) => {
      if (err) { console.error(err); } else {}
    });
    Accounts.enableUser2fa(this.state.code, (err) => {
      if (err) { console.error(err); }
    });
  }

  render() {
    // sets state variable to a boolean depending on which box is checked
    const handleCheck = () => {
      this.setState({ value: document.getElementById('htmlRadio1').checked });
    };

    // Submit method that will lead to another page that will allow two-factor authentication
    const onSubmit = () => {
      Meteor.call(
        'sendEmail',
        'Glen <glarita@hawaii.edu>',
        'gidplanner@gmail.com',
        'Two Factor Authentication',
        'Your 2FA code is...',
      );
      console.log('email sent');
    };
    return (
      <div>
        <Container fluid='true' style={{ width: '1000px' }}>
          <Segment className='cardStyle' padded>
            <p id='headers'>Security</p>
            <Divider />
            <Form>
              <p className='settingsFont'>Two-Factor Authentication</p>
              <p>Would you like to enable two-factor authentication?</p>
              <FormGroup grouped>
                <FormField control='input' label='Yes' type='radio' name='htmlRadios' id='htmlRadio1' onChange={handleCheck} />
                <FormField control='input' label='No' type='radio' name='htmlRadios' id='htmlRadio2' onChange={handleCheck} />
              </FormGroup>
              <div style={{ textAlign: 'center' }}>
                <Button variant="contained" onClick={() => {
                  Accounts.generate2faActivationQrCode('My app name', (err, svg) => {
                    if (err) { console.error('...', err); return; }
                    this.setState({ qrCode: Buffer.from(svg).toString('base64') });
                  });
                }} sx={{ backgroundColor: '#1B66C9' }}>Submit</Button>
              </div>
            </Form>
          </Segment>
          {(this.state.qrCode != null) ? <img
            width="200"
            src={`data:image/svg+xml;base64,${this.state.qrCode}`}
          /> : <p>no qr</p>}
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
