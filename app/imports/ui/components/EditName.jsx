import React from 'react';
import { Container, Form, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
// import { IconButton } from '@mui/material';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Profiles } from '../../api/profile/ProfileCollection';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const EditName = ({ firstname, lastname }) => {
  const submit = (data) => {
    const { firstName, lastName, _id } = data;
    Profiles.collection.update(_id, { $set: { firstName, lastName } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  const segmentStyle = {
    borderRadius: '15px',
    marginTop: '20px',
    width: '60%',
    marginLeft: '20%',
    marginRightt: '20%',
  };

  return (
    <div>
      <Container>
        <Segment style={segmentStyle}>
          <p id='headers'>Name</p>
          <Form className='formStyle'>
            <Form.Input defaultValue={firstname} label='First name'></Form.Input>
            <Form.Input defaultValue={lastname} label='Last name'></Form.Input>
            <Form.Button onClick={submit}>Submit</Form.Button>
          </Form>
        </Segment>
      </Container>
    </div>
  );
};

// Require a document to be passed to this component.

EditName.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(EditName);
