import React from 'react';
import { Header } from 'semantic-ui-react';
import { Container, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class PersonalInfo extends React.Component {
  render() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Personal Info</Header>
        <Button>Testing</Button>
      </Container>

    );
  }
}

// Require a document to be passed to this component.
PersonalInfo.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(PersonalInfo);
