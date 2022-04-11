import React from 'react';
import { Loader, Segment, Grid, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import { Link } from 'react-router-dom';
// import { IconButton } from '@mui/material';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Profiles } from '../../api/profile/ProfileCollection';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class EditName extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { email, firstName, lastName, phone, _id } = data;
    Profiles.collection.update(_id, { $set: { email, firstName, lastName, phone } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Name updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {

    const formStyle = {
      fontFamily: 'Roboto',
      padding: '15px',
      marginLeft: '25%',
      marginRight: '25%',
      marginTop: '15px',
      borderRadius: '20px',
      width: '50%',
    };

    return (
      <Grid container centered>
        <Grid.Column>
          <Button as={Link} to={'/edit-profile/'} size="big" circular icon='chevron left' inverted style={{ color: '#484F52' }}/>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment style={formStyle}>
              <p style={{ textAlign: 'center' }}><i>Changes to your name will appear throughout the website.</i></p>
              <p style={{ textAlign: 'center' }} id='headers'>Name</p>
              <HiddenField name='email'/>
              <TextField name='firstName'/>
              <TextField name='lastName'/>
              <HiddenField name='phone'/>
              <SubmitField value='Change' style={{ backgroundColor: '#1B66C9', color: 'white', fontFamily: 'roboto' }}/>
              <ErrorsField/>
              <HiddenField name='owner'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require a document to be passed to this component.

EditName.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Profiles.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditName);
