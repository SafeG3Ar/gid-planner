import React, { useState } from 'react';
import { List, Item, Form, Segment, Container, Button, Icon, Input, Modal, Label, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, DateField, HiddenField } from 'uniforms-semantic';
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
import ListItems from './ListItems';
import { addItemMethod, addListMethod, updateListMethod } from '../../startup/both/Methods';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
    name: { type: String, optional: true },
    item: { type: String, optional: true },
    listId: { type: String, optional: true },
    checked: { type: Boolean, defaultValue: false, optional: true },
    createdAt: { type: Date, optional: true },
    owner: { type: String, optional: true },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddListItem extends React.Component {

    state = { listId: '', listName: '', inputItem: '' }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         hideCompleted: false,
    //         // item: '',
    //         listName: '',
    //         show: false,
    //     };
    //     this.handleListName = this.handleListName.bind(this);

    //     this.toggleHideCompleted = this.toggleHideCompleted.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    //     this.handleChange = this.handleChange.bind(this);


    // }
    handleListId = (listId) => {
        this.setState({ listId });
        console.log('handleListId', this.state.listId);
    }

    handleChange = (e, { listName, value }) => this.setState({ [listName]: value }, () => {
        console.log('handleChange listName:', this.state.listName);
    })

    handleListSubmit = (data, formRef) => {
        const { listId, listName } = this.state;
        this.handleChange;
        const { name, _id } = data;
        const list = Lists.collection.findOne({ _id: listId });
        const owner = Meteor.user().username;
        if (typeof (list) === 'undefined') {
            Meteor.call(addListMethod, {
                name,
                owner: owner,
            },
                (error, result) => {
                    if (error) {
                        swal('Error', error.message, 'error');
                    } else {
                        this.setState({ listId: result });
                        console.log('result', result);
                    }
                })
        } else {
            Meteor.call(updateListMethod, {
                _id: listId,
                name,
                owner: owner,
            },
                (error) => {
                    if (error) {
                        swal('Error', error.message, 'error');
                    } else {
                        const list = Lists.collection.findOne(listId);
                        console.log(list);
                    }
                })
        }
    }


    handleSubmit = (data, formRef) => {
        const { listName, listId } = this.state;
        const { item, checked } = data;
        const createdAt = new Date();
        const owner = Meteor.user().username;
        const list = Lists.collection.findOne(listId);

        Meteor.call(addItemMethod, {
            item,
            listId: listId,
            checked,
            createdAt: createdAt,
            owner: owner,
        },
            (error) => {
                if (error) {
                    swal('Error', error.message, 'error');
                } else {
                    console.log('listID handleSubmit:', listId);
                    console.log('listName item:', listName);
                    formRef.reset();
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

    render = () => {
        let fRef = null;
        // const { listName, disable } = this.state;
        console.log('listID render', this.state.listId);
        return (
            <div>
                <AutoForm
                    schema={bridge}
                    onSubmit={data => this.handleListSubmit(data)}
                >
                    <TextField
                        id='name'
                        placeholder='Give your list a name'
                        name='name'
                    // value={listName}
                    />
                    <Button
                        type='submit'
                        size='small'
                        // floated='right'
                        icon
                        labelPosition='left'
                    >
                        <Icon name='save' />
                        Save
                    </Button>
                </AutoForm>
                < AutoForm
                    ref={ref => { fRef = ref; }
                    }
                    schema={bridge}
                    // onChange={this.handleChange}
                    onSubmit={data => this.handleSubmit(data, fRef)}
                >
                    <TextField
                        placeholder='Type to add to list'
                        name='item'
                    />
                    <Button
                        type='submit'
                        size='small'
                        // floated='left'
                        icon
                    >
                        <Icon name='plus square' />
                    </Button>
                    {/* <SubmitField value='Submit' /> */}
                </AutoForm>

                <Segment>
                    <ListItems listId={this.state.listId} handleListId={this.handleListId} handleChange={this.handleChange} />
                </Segment>

                {/* <Segment>
                    <Header as='h3'>
                        List
                    </Header>
                    <ul>
                        {this.props.items.map((item, index) => <ListItem key={index} item={item} />)}
                    </ul>
                </Segment> */}
            </div >
        );
    }
};

AddListItem.propTypes = {
    // doc: PropTypes.object,
    // name: PropTypes.string,
    // lists: PropTypes.array,

    // items: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

const AddListItemContainer = withTracker(() => {
    // const documentId = match.params._id;
    // const user = Meteor.user().username;
    const sub1 = Meteor.subscribe(Items.userPublicationName);
    const sub2 = Meteor.subscribe(Lists.userPublicationName);
    return {
        // doc: Lists.collection.findOne(documentId),
        // lists: _.where(Lists.collection.find().fetch(), { owner: user }),
        // item: Items.collection.find({}).fetch(),
        // items: Items.collection.find({}, { sort: { createdAt: -1 } }).fetch(),
        // incompleteCount: Items.collection.find({ checked: { $ne: true } }).count(),
        ready: sub1.ready() && sub2.ready(),
    };
})(AddListItem);

export default withRouter(AddListItemContainer);
