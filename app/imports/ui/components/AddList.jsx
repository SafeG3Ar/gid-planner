import React from 'react';
import { List, Form, Container, Button, Icon, Input, Modal, Label, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField, SelectField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
// import { addItemMethod, insertListMethod } from '../../startup/both/Methods';
import { Lists } from '../../api/list/ListCollection';
import { Items } from '../../api/item/ItemCollection';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
    name: { type: String },
});


/** Renders the Page for adding a document. */
class AddList extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         items: [],
    //         open: false,
    //     };
    //     this.handleRemove = this.handleRemove.bind(this);
    //     this.handleChecked = this.handleChecked.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }

    handleRemove(id) {
        const finalItems = this.state.items.filter((item) => {
            if(item._id != id) {
                return item;
            }
        });
        this.setState({
            items: finalItems,
            open: true,
        });
    }

    handleChecked(id) {
        const finalItems = this.state.items.map((item) => {
            if(item._id === id) {
                item.checked =! item.checked
            }
            return item;
        });
        this.setState({
            items: finalItems,
        });
    }

    handleClose = () => {
        this.setState({
            open: false,
        });
    }

    // handleOpen = () => this.setState({ modalOpen: true });
    // handleClose = () => this.setState({ modalOpen: false });

    // addItems = () => {
    //     this.setState(prevState => ({
    //         items: [...prevState.items, newItem]
    //     }))
    // };

    /** On submit, insert the data. */
    handleSubmit = (data, formRef) => {
        const { name } = data;
        const owner = Meteor.user().username;
        Lists.collection.insert({ name, owner });
            (error) => {
                if (error) {
                    swal('Error', error.message, 'error');
                } else {
                    // swal('Success', 'List added successfully', 'success');
                    formRef.reset();
                }
            };
    }

    render() {
        let fRef = null;
        const bridge = new SimpleSchema2Bridge(formSchema);
        return (
            <div>
                <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.handleSubmit(data, fRef)} >
                        <TextField id='list-name' name='name' />
                        {/* <FormControl>
                            <Input
                                id='list-items'
                                name='items'
                                type='text'
                                placeholder='Type to add new items'
                            />
                            <SubmitField id='item-submit' value='Submit' /> 
                        </FormControl> */}
                        <SubmitField id="list-submit" value='Submit' />
                </AutoForm>
            </div>
        );
    }
};

AddList.propTypes = {
    doc: PropTypes.object,
    item: PropTypes.object,
    ready: PropTypes.bool.isRequired,
};

const AddListContainer = withTracker(({ match }) => {
    const docId = match.params._id;
    const sub1 = Meteor.subscribe(Lists.userPublicationName);
    const sub2 = Meteor.subscribe(Items.userPublicationName);
    return {
        doc: Lists.collection.findOne(docId),
        ready: sub1.ready() && sub2.ready(),
    };
})(AddList);

export default withRouter(AddListContainer);
