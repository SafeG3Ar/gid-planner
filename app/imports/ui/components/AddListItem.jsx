import React from 'react';
import { List, Item, Form, Segment, Container, Button, Icon, Input, Modal, Label, Header } from 'semantic-ui-react';
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
import { updateListMethod } from '../../startup/both/Methods';

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

    state = { listID: '', listName: '', show: false }

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

    handleChange = (e, { listID, value }) => this.setState({ [listID]: value })

    handleListSubmit = (data, formRef) => {
        const { listID, listName } = this.state;
        // e.preventDefault();
        const { name, _id } = data;
        const owner = Meteor.user().username;
        this.setState({
            listID: Lists.collection.insert({ name, owner },
                (error) => {
                    if (error, result) {
                        swal('Error', error.message, 'error');
                    } else {
                        // console.log(this.state.listName);
                        console.log(this.state.listID);
                        this.state.show = false;
                    }
                })

        });
    }


    handleSubmit = (data, formRef) => {
        const { listID } = this.state;
        const { name, item, checked } = data;
        const createdAt = new Date();
        const owner = Meteor.user().username;
        Items.collection.insert({ item, listId: this.state.listID, checked, createdAt, owner },
            (error) => {
                if (error) {
                    swal('Error', error.message, 'error');
                } else {
                    formRef.reset();

                }
            });
    }

    // handleSubmit = (data, formRef) => {
    //     const { name, item, checked, _id } = data;
    //     const createdAt = new Date();
    //     const owner = Meteor.user().username;
    //     const lists = _.pluck(Lists.collection.find({}).fetch(), '_id');

    //     const listId = Lists.collection.insert({ name, owner },
    //         (error) => {
    //             if (error) {
    //                 swal('Error', error.message, 'error');
    //             } else {
    //                 console.log(listId);
    //                 //  const list = Items.collection.findOne({ _id: listId });
    //                 // if (listId 
    //                 Items.collection.insert({ item, listId, checked, createdAt, owner },
    //                     (error) => {
    //                         if (error) {
    //                             swal('Error', error.message, 'error');
    //                         } else {
    //                             console.log(listId);
    //                             // formRef.reset();
    //                     }});    

    //         }});
    // }


    // Items.collection.insert({ item, listId, checked, createdAt, owner },
    //     (error) => {
    //         if (error) {
    //             swal('Error', error.message, 'error');
    //         } else {
    //             // swal('Success', 'Item added', 'success');
    //             formRef.reset();
    //             // this.setState({ item: textInput })
    //         }
    //     });

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
        return (
            <div>
                <AutoForm
                    ref={ref => { fRef = ref; }}
                    schema={bridge}
                    onSubmit={data => this.handleListSubmit(data, fRef)}
                    model={this.props.doc}
                >
                    <TextField
                        placeholder='Give your list a name'
                        name='name'

                    />
                    <SubmitField label='Update' value='Update' />
                </AutoForm>
                <AutoForm
                    ref={ref => { fRef = ref; }}
                    schema={bridge}
                    onSubmit={data => this.handleSubmit(data, fRef)}
                >
                    <TextField
                        placeholder='Type to add to list'
                        name='item'
                    />
                    <SubmitField value='Submit' />
                </AutoForm>
                <Segment>
                    {/* <List>
                        {this.props.items.map((item) => <ListItem key={item._id} item={item} />)}
                    </List> */}
                    <ul>
                        {this.props.items.map((item, index) => <ListItem key={index} item={item} />)}
                    </ul>
                </Segment>
            </div>
        );
    }
};

AddListItem.propTypes = {
    doc: PropTypes.object,
    // model: PropTypes.object,
    // lists: PropTypes.array,
    // item: PropTypes.object,
    items: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

const AddListItemContainer = withTracker(({ match }) => {
    const documentId = match.params._id;
    // const user = Meteor.user().username;
    const sub1 = Meteor.subscribe(Items.userPublicationName);
    const sub2 = Meteor.subscribe(Lists.userPublicationName);
    return {
        doc: Lists.collection.findOne(documentId),
        // lists: _.where(Lists.collection.find().fetch(), { owner: user }),
        // item: Items.collection.find({}).fetch(),
        items: Items.collection.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Items.collection.find({ checked: { $ne: true } }).count(),
        ready: sub1.ready() && sub2.ready(),
    };
})(AddListItem);

export default withRouter(AddListItemContainer);
