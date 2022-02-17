import React from 'react';
import { Menu, Loader, Tab, Container } from 'semantic-ui-react';
import swal from 'sweetalert';
// import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField, Menu, Tab } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Stuffs } from '../../api/stuff/Stuff';
import PersonalInfo from '../components/PersonalInfo';
// import StuffItem from '../components/StuffItem';

//  = new SimpleSchema2Bridge(Stuffs.schema);
const personalInfo = () => <PersonalInfo />;
const panes = [
  { menuItem: <Menu.Item key='personalInfo' id='personalInfo'>Personal Info</Menu.Item>, render: personalInfo },
  { menuItem: <Menu.Item key='Security' id='Security'>Security</Menu.Item> },
  { menuItem: <Menu.Item key='Manage' id='Manage'>Manage</Menu.Item> },
];

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { name, quantity, condition, _id } = data;
    Stuffs.collection.update(_id, { $set: { name, quantity, condition } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <div>
        <Container>
          <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} id = 'tabs'/>
        </Container>
      </div>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Stuffs.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditProfile);
