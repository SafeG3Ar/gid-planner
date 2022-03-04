import React from 'react';
import { Loader, Grid, Table } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
// import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
// import { Link } from 'react-router-dom';
// import { IconButton } from '@mui/material';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
// import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Tasks } from '../../api/task/TaskCollection';

// const bridge = new SimpleSchema2Bridge(Tasks.schema);

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Task extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { email, firstName, lastName, phone, _id } = data;
    Tasks.collection.update(_id, { $set: { email, firstName, lastName, phone } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Name updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    /*
    const formStyle = {
      fontFamily: 'Roboto',
      padding: '15px',
      marginLeft: '25%',
      marginRight: '25%',
      marginTop: '15px',
      borderRadius: '20px',
      width: '50%',
    };
    */

    return (
      <Grid container centered>
        <Grid.Column>
          <Table></Table>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require a document to be passed to this component.

Task.propTypes = {
  tasks: PropTypes.array.isRequired,
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Tasks.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const tasks = Tasks.collection.find({}).fetch();
  return {
    tasks,
    ready,
  };
})(Task);
