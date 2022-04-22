import React from 'react';
import { Divider, Form, FormField, FormGroup, Segment, Image } from 'semantic-ui-react';
import { Button, Container } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Buffer } from 'buffer';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { Profiles } from '../../api/profile/ProfileCollection';

/** Renders a segment for the security settings See pages/EditProfile.jsx. */
class Security extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      open: false,
      enabled: false,
      check: false,
      qrCode: null,
      refresh: false,
    };
  }

  // filter out user profile and store into variable
  profile = this.props.profiles.filter(user => user.owner === Meteor.user().username);

  // store the profile object into variable. Object at the first index is the only object for the user, since there can be no duplicate usernames or emails.
  user = this.profile.find(prof => prof !== undefined);

  // submit function for enabling or disabling 2FA.
  onSubmit = () => {
    // declare variables for user to pass through update method.
    const email = Meteor.user().emails[0].address;
    const firstName = this.user.firstName;
    const lastName = this.user.lastName;
    const phone = this.user.phone;
    // if user selected yes.
    if (this.state.value) {
      Accounts.generate2faActivationQrCode('gid-planner', (err, svg) => {
        if (err) { swal('Error', err.message, 'error'); return; }
        this.setState({ qrCode: Buffer.from(svg).toString('base64') });
      });
      this.setState({ open: true });
      // if user selected no.
    } else {
      Accounts.disableUser2fa((err) => {
        if (err) { swal('Error', err.message, 'error'); }
      });
      this.setState({ qrCode: null });
      this.setState({ enabled: false });
      const auth = this.state.enabled;
      Profiles.collection.update(this.user._id, { $set: { email, firstName, lastName, phone, auth } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', '2FA is now disabled!', 'success')));
      this.setState({ refresh: true });
    }
  };

  // submit method for enabling 2FA.
  onSubmit2 = () => {
    // declare variables for user to pass through update method.
    const email = Meteor.user().emails[0].address;
    const firstName = this.user.firstName;
    const lastName = this.user.lastName;
    const phone = this.user.phone;
    Accounts.enableUser2fa(this.state.code, (err) => {
      if (err) { swal('Error. Please try again.', err.message, 'error'); } else {
        this.setState({ enabled: true });
        const auth = this.state.enabled;
        Profiles.collection.update(this.user._id, { $set: { email, firstName, lastName, phone, auth } }, (error) => (error ?
          swal('Error', error.message, 'error') :
          swal('Success', '2FA is now enabled!', 'success')));
        this.setState({ refresh: true });
      }
    });
  };

  // handle change in input from user.
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  render() {
    // sets state variable to a boolean depending on which box is checked
    const handleCheck = () => {
      this.setState({ value: document.getElementById('htmlRadio1').checked });
    };

    // refreshes page
    if (this.state.refresh) {
      window.location.reload(false);
    }

    // Submit method that will lead to another page that will allow two-factor authentication
    return (
      <div>
        <Container fluid='true' style={{ width: '1000px' }}>
          <Segment className='cardStyle' padded fluid='true'>
            <p id='headers'>Security</p>

            {this.user.auth ? (<p>Your account currently has Two-Factor Authentication enabled.</p>)
              : (<p>Your account does not have Two-Factor Authentication.</p>)}

            <Divider />
            {this.user.auth ? (
              <Form>
                <p className='settingsFont'>Two-Factor Authentication</p>
                <p>Would you like to enable two-factor authentication?</p>
                <FormGroup grouped>
                  <FormField control='input' label='Yes' type='radio' name='htmlRadios' id='htmlRadio1' onChange={handleCheck} disabled />
                  <FormField control='input' label='No' type='radio' name='htmlRadios' id='htmlRadio2' onChange={handleCheck} />
                </FormGroup>
                <div style={{ textAlign: 'center' }}>
                  <Button variant="contained" onClick={this.onSubmit} sx={{ backgroundColor: '#1B66C9' }}>Submit</Button>
                </div>
              </Form>) : (
              <Form>
                <p className='settingsFont'>Two-Factor Authentication</p>
                <p>Would you like to enable two-factor authentication?</p>
                <FormGroup grouped>
                  <FormField control='input' label='Yes' type='radio' name='htmlRadios' id='htmlRadio1' onChange={handleCheck} />
                  <FormField control='input' label='No' type='radio' name='htmlRadios' id='htmlRadio2' onChange={handleCheck} disabled />
                </FormGroup>
                <div style={{ textAlign: 'center' }}>
                  <Button variant="contained" onClick={this.onSubmit} sx={{ backgroundColor: '#1B66C9' }}>Submit</Button>
                </div>
              </Form>
            )}
          </Segment>
          {this.state.qrCode === null ? (
            ''
          ) : (
            <Container style={{ textAlign: 'center' }} className='settingsFont'>
              <p>Please Scan the QR Code below with a 2FA application, such as DUO or Google.</p>
              <p>Once scanned, use the codes provided to you in your 2FA application and enter them in the form below.</p>
              <p>Once completed, submit the form.</p>
              <Image
                width="200"
                src={`data:image/svg+xml;base64,${this.state.qrCode}`}
                centered
              />
              <Form onSubmit={this.onSubmit2}>
                <Segment stacked style={{ borderRadius: '10px', width: '50%', marginLeft: '25%', marginRight: '25%', boxShadow: '0' }}>
                  <Form.Input
                    label="2facode"
                    id="2facode"
                    icon="qrcode"
                    iconPosition="left"
                    name="code"
                    placeholder="Enter code from 2FA app"
                    onChange={this.handleChange}
                  /><Form.Button id="signin-form-submit" content="Submit" />
                </Segment>
              </Form>
            </Container>
          )}
        </Container>
      </div>
    );
  }
}

Security.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withTracker(() => {
  // Get access to Vendor documents.

  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const ready = subscription.ready();
  // Get the Vendor documents
  const profiles = Profiles.collection.find().fetch();
  return {
    profiles,
    ready,
  };
})(Security);
