import React from 'react';
import { Container, Segment, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a segment for the manage settings See pages/EditProfile.jsx. */
class Manage extends React.Component {
  render() {
    return (
      <div>
        <Container fluid='true' style={{ width: '1000px' }}>
          <Segment className='cardStyle' padded>
            <p id='headers'>Manage</p>
            <p className='settingsFont'>Tasks</p>
            <Divider />
            <p className='settingsFont'>Lists</p>
            <Divider />
            <Divider />
            <p className='settingsFont'>Tags</p>
          </Segment>
        </Container>
      </div>
    );
  }
}

// Require a document to be passed to this component.
Manage.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Manage);
