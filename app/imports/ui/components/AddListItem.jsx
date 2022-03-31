import React from 'react';
import { Item, Form, Segment, Container, Button, Icon, Input, Modal, Label, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, DateField, HiddenField } from 'uniforms-material';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Items } from '../../api/item/ItemCollection';
import { Lists } from '../../api/list/ListCollection';
import ListItem from './ListItem';
import { addItemMethod } from '../../api/item/ItemCollection.methods';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
    item: { type: String, optional: true },
    listId: { type: String, optional: true },
    checked: { type: Boolean, optional: true },
    createdAt: { type: Date, optional: true },
    owner: { type: String, optional: true },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddListItem extends React.Component {

    state = {
        textInput: '',
        show: false,
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         hideCompleted: false,
    //         // item: '',
    //         textInput: '',
    //         show: false,
    //     };

    //     this.toggleHideCompleted = this.toggleHideCompleted.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    //     this.handleChange = this.handleChange.bind(this);

    // }

    getInitialState() {
        return {
            hideCompleted: false
        }
    }

    toggleHideCompleted = () => {
        this.setState({
            hideCompleted: !this.state.hideCompleted
        });
    }

    handleChange = (e, { inputText, value }) => this.setState({ [inputText]: value })

    handleSubmit = (data, formRef) => {
        // const { inputText } = this.state
        // e.preventDefault();
        const { item, listId, checked } = data;
        // const item = this.state.textInput;
        const createdAt = new Date();
        const owner = Meteor.user().username;
        Items.collection.insert({ item, listId, checked, createdAt, owner },
            (error) => {
                if (error) {
                    swal('Error', error.message, 'error');
                } else {
                    swal('Success', 'Item added', 'success');
                    formRef.reset();
                    // this.setState({ item: textInput })
                }
            });
    }

    // renderItems() {
    //     let filteredItems = this.props.items;
    //     if (this.state.hideCompleted) {
    //         filteredItems = filteredItems.filter(item => !item.checked);
    //     }
    //     return filteredItems.map((item) => {
    //         return (
    //             <ListItem key={item._id} item={item} />
    //         )
    //     });
    // }

    // render() {
    //     let fRef = null;
    //     return (
    //         <div>
    //             <Header>
    //                 <h1>List ({this.props.incompleteCount}) </h1>
    //                 <Container style={{ width: '1000px' }}>
    //                     <label className='hide-completed'>
    //                         <input
    //                             type='checkbox'
    //                             readOnly={true}
    //                             checked={this.state.hideCompleted}
    //                             onClick={this.toggleHideCompleted}
    //                         />
    //                         Hide Completed Items
    //                     </label>
    //                     <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.handleSubmit(data, fRef)} >
    //                         <TextField
    //                             name='item'
    //                             // onChange={(e) => this.setState({ textInput: e.target.value })}
    //                             placeholder='Type to add to list'
    //                         />
    //                         <HiddenField name='createdAt' value={new Date()} />
    //                         <SubmitField value='Submit' />
    //                     </AutoForm>
    //                     <ul>
    //                         {this.renderItems()}
    //                         {/* {this.props.items.map((item) => <ListItem key={item._id} item={item} Items={Items} />)} */}
    //                     </ul>
    //                 </Container>
    //             </Header>
    //         </div>
    //     );
    // }

    render() {
        let fRef = null;
        // const { item, inputText } = this.state
        return (
            <div>
                <AutoForm ref={ref => {
                    fRef = ref; }}
                    schema={bridge}
                    onSubmit={data => this.handleSubmit(data, fRef)}>
                    <TextField
                        placeholder='Type to add to list'
                        name='item'
                        // value={this.state.inputText}
                    />
                    <SubmitField value='Submit' />
                </AutoForm>
                <Segment>
                    <ul>
                        {this.props.items.map((item, index) => <ListItem key={index} item={item} />)}
                    </ul>
                </Segment>
            </div>
        );
    }
};

AddListItem.propTypes = {
    items: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

const AddListItemContainer = withTracker(() => {
    const sub1 = Meteor.subscribe(Items.userPublicationName);
    return {
        items: Items.collection.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Items.collection.find({ checked: { $ne: true } }).count(),
        ready: sub1.ready(),
    };
})(AddListItem);

export default withRouter(AddListItemContainer);
