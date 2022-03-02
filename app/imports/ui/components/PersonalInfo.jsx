import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Divider, Segment, Loader } from 'semantic-ui-react';
// import { _ } from 'meteor/underscore';
import { Container, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// import NameModal from '../components/NameModal';
// import { withRouter } from 'react-router-dom';
import { Profiles } from '../../api/profile/ProfileCollection';
// import NameModal from '../components/NameModal';

// const userProfile = Profile.findOne({});

/** Renders a segment for the personal information settings See pages/EditProfile.jsx. */
class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open2: false,
      redirectToReferer1: false,
      redirectToReferer2: false,
    };
  }

  // render the page once subscriptions have been received.
  render() {
    if (this.state.redirectToReferer1) {
      return <Redirect to={'/edit-name'}/>;
    }
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Profile data</Loader>;
  }

  renderPage() {
    // open function to handle the first modal.
    const handleClick = () => {
      this.setState({ redirectToReferer1: true });
    };

    // open function to handle the second modal.
    const handleClick2 = () => {
      this.setState({ redirectToReferer2: true });
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
            <p className='settingsFont'>Name: {user.firstName} {user.lastName}
              <IconButton onClick={handleClick}><ArrowForwardIosIcon fontSize="small" className='muiButtons' /></IconButton>
            </p>
            <Divider />
            <p className='settingsFont'> Phone Number: {user.phone} <IconButton onClick={handleClick2}><ArrowForwardIosIcon fontSize="small" className='muiButtons' /></IconButton>
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
