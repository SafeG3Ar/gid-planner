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
import { addItemMethod, addListMethod, updateListMethod } from '../../startup/both/Methods';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
    name: { type: String, optional: true },
    item: { type: String, optional: true },
    listId: { type: String, optional: true },
    checked: { type: Boolean, optional: true },
    createdAt: { type: Date, optional: true },
    owner: { type: String, optional: true },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddListItem extends React.Component {

    state = { listID: '', listName: '', disable: false }

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

    setDisable = (e) => {
        if (this.state.disable) {
            return;
        }
        this.setState({
            disable: true
        });
    }

    // handleClick = () => {
    //     this.setState((prevState) => ({ active: !prevState.active }))
    // }

    handleChange = (e, { listName, value }) => this.setState({ [listName]: value })

    handleListSubmit = (data, formRef) => {
        const { listID } = this.state;
        // e.preventDefault();
        this.handleChange;
        const { name, _id } = data;
        // const name = this.state.listName;
        const list = Lists.collection.findOne({ _id: listID });
        const owner = Meteor.user().username;
        if (typeof (list) === 'undefined') {
            Meteor.call(addListMethod, {
                name: name,
                owner: owner,
            },
                (error, result) => {
                    if (error) {
                        swal('Error', error.message, 'error');
                    } else {
                        console.log('listID', this.state.listID);
                        this.setState({ listID: result });
                        console.log('result', result);
                        console.log(list);
                    }
                })
        } else {
            Meteor.call(updateListMethod, {
                _id: this.state.listID,
                name: name,
                owner: owner,
            },
                (error) => {
                    if (error) {
                        swal('Error', error.message, 'error');
                    } else {
                        // const list = Lists.collection.findOne(this.state.listID);
                        // console.log(list);
                    }
                })
        }
    }


    handleSubmit = (data, formRef) => {
        const { listName, listID } = this.state;
        const { item, checked } = data;
        const createdAt = new Date();
        const owner = Meteor.user().username;
        const list = Lists.collection.findOne(this.state.listID);
        const getListID = list._id;
        // Lists.collection.update(getListID, { $set: { name, owner } });
        // if (list.name) {
        //     // this.handleChange.bind(this, listName);
        //     this.handleChange(this);
        //     this.setState({ listName: list.name });
        // }
        Meteor.call(addItemMethod, {
            item,
            listId: listID,
            checked,
            createdAt: createdAt,
            owner: owner,
        },
            // Items.collection.insert({ item, listId: listID, checked, createdAt, owner },
            (error) => {
                if (error) {
                    swal('Error', error.message, 'error');
                } else {
                    console.log('listID item:', listID);
                    console.log('listName item:', this.state.listName);
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
        const { listName, disable } = this.state;
        return (
            <div>
                <AutoForm
                    // ref={ref => { fRef = ref; }}
                    schema={bridge}
                    // onChange={() => {this.handleChange}}
                    onSubmit={data => this.handleListSubmit(data)}
                // model={this.props.doc}
                >
                    <TextField
                        id='name'
                        placeholder='Give your list a name'
                        name='name'
                        value={this.name}
                    // onChange={this.handleChange.bind(this, listName)}
                    />
                    <Button
                        type='submit'
                        onChange={this.handleChange}
                    // onClick={() => { this.setDisable; }}
                    // onKeyPress={(e) => {
                    //     if (e.key === 'Enter') this.setDisable;
                    // }}
                    // disabled={disable}
                    // attached='right'
                    >
                        Save list name
                    </Button>
                    {/* <SubmitField
                        value='Save list name'
                    /> */}
                </AutoForm>
                {/* <Form
                    // ref={ref => { fRef = ref; }}
                    schema={bridge}
                    onSubmit={data => this.handleListSubmit(data, fRef)}
                // model={this.props.doc}
                >
                    <Form.Field>
                        <input
                            type='text'
                            id='name'
                            placeholder='Give your list a name'
                            name='name'
                            value={this.props.name}
                            onChange={this.handleChange}
                        />
                        <input
                            type='submit'
                            name='submit'
                            value='Submit'
                        />
                    </Form.Field>
                    {/* <Button type='submit'>Update</Button> */}
                {/* <SubmitField label='Update' value='Update' /> */}
                {/* </Form> * /} */}

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
                    <SubmitField value='Submit' />
                </AutoForm>

                {/* <Segment>
                    <pre>{JSON.stringify({ listName }, null, 2)}</pre>
                </Segment> */}
                <Segment>
                    {/* <List>
                        {this.props.items.map((item) => <ListItem key={item._id} item={item} />)}
                    </List> */}
                    <ul>
                        {this.props.items.map((item, index) => <ListItem key={index} item={item} />)}
                    </ul>
                </Segment>
            </div >
        );
    }
};

AddListItem.propTypes = {
    // doc: PropTypes.object,
    name: PropTypes.string,
    // model: PropTypes.object,
    // lists: PropTypes.array,
    // item: PropTypes.object,
    items: PropTypes.array.isRequired,
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
        items: Items.collection.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Items.collection.find({ checked: { $ne: true } }).count(),
        ready: sub1.ready() && sub2.ready(),
    };
})(AddListItem);

export default withRouter(AddListItemContainer);
