import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Divider, Segment, Loader } from 'semantic-ui-react';
// import { _ } from 'meteor/underscore';
import { Container, IconButton, Modal, Box, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
import { Profiles } from '../../api/profile/ProfileCollection';
// import NameModal from '../components/NameModal';

// const userProfile = Profile.findOne({});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '15px',
};

/** Renders a segment for the personal information settings See pages/EditProfile.jsx. */
class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open2: false,
    };
  }

  // render the page once subscriptions have been received.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Profile data</Loader>;
  }

  renderPage() {
    // open function to handle the first modal.
    const handleOpen = () => {
      this.setState({ open: true });
    };

    // close function to handle the first modal.
    const handleClose = () => {
      this.setState({ open: false });
    };

    // open function to handle the second modal.
    const handleOpen2 = () => {
      this.setState({ open2: true });
    };

    // close function to handle the second modal.
    const handleClose2 = () => {
      this.setState({ open2: false });
    };

    // store profile that has an owner field that matches the username of the current user.
    const profile = this.props.profiles.filter(user => user.owner === Meteor.user().username);

    // store the profile object into variable. Object at the first index is the only object for the user, since there can be no duplicate usernames or emails.
    const user = profile[0];

    return (
      <div>
        <Container fluid='true' style={{ width: '1000px' }}>
          <Segment className='cardStyle' padded>
            <p id='headers'>Personal Info</p>
            <p className='settingsFont'>Name: {user.firstName} {user.lastName} <IconButton onClick={handleOpen}><ArrowForwardIosIcon fontSize="small" className='muiButtons' /></IconButton>
              <Modal
                open={this.state.open}
                onClose={handleClose}
              ><Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Name
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Typography>
                </Box>
              </Modal>
            </p>
            <Divider />
            <p className='settingsFont'> Phone Number: {user.phone} <IconButton onClick={handleOpen2}><ArrowForwardIosIcon fontSize="small" className='muiButtons' /></IconButton>
              <Modal
                open={this.state.open2}
                onClose={handleClose2}
              ><Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Phone
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Typography>
                </Box>
              </Modal>
            </p>
            <Divider />
            <p className='settingsFont'>Email: {user.email}
            </p>
            <Divider />
          </Segment>
        </Container>
      </div>

    );
  }
}

// Require a document to be passed to this component.

PersonalInfo.propTypes = {
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
})(PersonalInfo);
