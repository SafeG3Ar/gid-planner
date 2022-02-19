import React from 'react';
import { Divider, Segment } from 'semantic-ui-react';
import { Container, IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class PersonalInfo extends React.Component {
  render() {
    return (
      <div>
        <Container fluid='true' style={{ width: '1000px' }}>
          <Segment className='cardStyle' padded>
            <p id='headers'>Personal Info</p>
            <p style={{ textAlign: 'center' }}>Name: (first name prop) (second name prop) <IconButton><ArrowForwardIosIcon fontSize="small" className='muiButtons'/></IconButton></p>
            <Divider/>
            <p style={{ textAlign: 'center' }}>Phone: phone number <IconButton><ArrowForwardIosIcon fontSize="small" className='muiButtons'/></IconButton></p>
            <Divider/>
            <p style={{ textAlign: 'center' }}>Email: email <IconButton><ArrowForwardIosIcon fontSize="small" className='muiButtons'/></IconButton></p>
            <Divider/>
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
