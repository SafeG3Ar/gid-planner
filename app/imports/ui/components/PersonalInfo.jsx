import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Divider, Segment, Loader, Button } from 'semantic-ui-react';
// import { _ } from 'meteor/underscore';
import { Container } from '@mui/material';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
      // return <Redirect to={'/edit-name'}/>;
    }
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Profile data</Loader>;
  }

  renderPage() {
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
              <Button as={Link} to={`/edit-name/${user._id}`} size="medium" circular icon='chevron right' inverted style={{ color: '#484F52' }}/>
            </p>
            <Divider />
            <p className='settingsFont'> Phone Number: {user.phone} <Button as={Link} to={`/edit-name/${user._id}`} size="medium" circular icon='chevron right' inverted style={{ color: '#484F52' }}/>
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
