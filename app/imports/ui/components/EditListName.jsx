import React from 'react';
import { Loader, Tab } from 'semantic-ui-react';
import swal from 'sweetalert';
// import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField, Menu, Tab } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Lists } from '../../api/list/ListCollection';


const formSchema = new SimpleSchema({
    name: { type: String, optional: true },
    owner: { type: String, optional: true },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for editing a single document. */
class EditListName extends React.Component {

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
      }

    // On successful submit, insert the data.
    onSubmit(data) {
        const { name, _id } = data;
        const owner = Meteor.user().username;
        Lists.collection.update(_id, { $set: { name, owner } }, (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'List name updated successfully', 'success')));
    }

    // If the subscription(s) have been received, render the page, otherwise show a loading icon.
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    // Render the form. Use Uniforms: https://github.com/vazco/uniforms
    renderPage() {
        return (
            <div>
                <AutoForm
                    // ref={ref => { fRef = ref; }}
                    schema={bridge}
                    // onChange={this.handleChange}
                    onSubmit={data => this.handleListSubmit(data)}
                    model={this.props.doc}
                >
                    <TextField
                        id='name'
                        placeholder='Change your list name'
                        name='name'
                    // onChange={this.handleChange.bind(this, listName)}
                    />
                    <SubmitField
                        value='Update'
                    />
                </AutoForm>
            </div>
        );
    }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditListName.propTypes = {
    doc: PropTypes.object,
    model: PropTypes.object,
    ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
    // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
    const documentId = match.params._id;
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Lists.userPublicationName);
    // Determine if the subscription is ready
    const ready = subscription.ready();
    // Get the document
    const doc = Lists.collection.findOne(documentId);
    return {
        doc,
        ready,
    };
})(EditListName);
