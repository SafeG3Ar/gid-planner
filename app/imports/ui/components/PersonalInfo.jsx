import React from 'react';
import { Divider, Segment } from 'semantic-ui-react';
import { Container, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a segment for the personal information settings See pages/EditProfile.jsx. */
class PersonalInfo extends React.Component {
  render() {
    return (
      <div>
        <Container fluid='true' style={{ width: '1000px' }}>
          <Segment className='cardStyle' padded>
            <p id='headers'>Personal Info</p>
            <p className='settingsFont'>Name: (first name prop) (second name prop) <IconButton><ArrowForwardIosIcon fontSize="small" className='muiButtons' /></IconButton></p>
            <Divider />
            <p className='settingsFont'>Phone: phone number <IconButton><ArrowForwardIosIcon fontSize="small" className='muiButtons' /></IconButton></p>
            <Divider />
            <p className='settingsFont'>Email: email <IconButton><ArrowForwardIosIcon fontSize="small" className='muiButtons' /></IconButton></p>
            <Divider />
          </Segment>
        </Container>
      </div>

    );
  }
}

// Require a document to be passed to this component.
/*
PersonalInfo.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
*/
// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(PersonalInfo);
