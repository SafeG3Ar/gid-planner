import React from 'react';
import { Form, FormField, FormGroup, Segment } from 'semantic-ui-react';
import { Button, Container } from '@mui/material';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a segment for the security settings See pages/EditProfile.jsx. */
class Security extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: false };
  }

  render() {
    // sets state variable to a boolean depending on which box is checked
    const handleCheck = () => {
      this.setState({ value: document.getElementById('htmlRadio1').checked });
    };

    // Submit method that will lead to another page that will allow two-factor authentication
    const onSubmit = () => {
      if (this.state.value) {
        // console.log(this.state.value);
      } else {
        // console.log(this.state.value);
      }
    };
    return (
      <div>
        <Container fluid='true' style={{ width: '1000px' }}>
          <Segment className='cardStyle' padded>
            <p id='headers'>Security</p>
            <Form>
              <p className='settingsFont'>Two-Factor Authentication</p>
              <p>Would you like to enable two-factor authentication?</p>
              <FormGroup grouped>
                <FormField control='input' label='Yes' type='radio' name='htmlRadios' id='htmlRadio1' onChange={handleCheck} />
                <FormField control='input' label='No' type='radio' name='htmlRadios' id='htmlRadio2' onChange={handleCheck} />
              </FormGroup>
              <div style={{ textAlign: 'center' }}>
                <Button variant="outlined" onClick={onSubmit}>Submit</Button>
              </div>
            </Form>
          </Segment>
        </Container>
      </div>
    );
  }
}
/*
// Require a document to be passed to this component.
Security.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
*/
// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Security);
