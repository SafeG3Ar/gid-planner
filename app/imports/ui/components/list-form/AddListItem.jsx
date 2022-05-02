import React from 'react';
import { Segment, Header, Container, Button, Icon } from 'semantic-ui-react';
import { AutoForm, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { _ } from 'meteor/underscore';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Items } from '../../../api/item/ItemCollection';
import { Lists } from '../../../api/list/ListCollection';
import ListItems from './ListItems';
import { addItemMethod, addListMethod, updateListMethod } from '../../../startup/both/Methods';

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

  // handleOpen = () => this.setState({ open: true });

  // handleClose = () => this.setState({ open: false });

  handleListId = (listId) => {
    this.setState({ listId });
    console.log('handleListId', this.state.listId);
  }

  handleChange = (e, { listName, value }) => this.setState({ [listName]: value }, () => {
    console.log('handleChange listName:', this.state.listName);
  })

  handleListSubmit = (data) => {
    const { listId } = this.state;
    const { name } = data;
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
            // this.setState({ show: true, });
            console.log('result', result);
          }
        });
    } else {
      Meteor.call(updateListMethod, {
        _id: listId,
        name,
        owner: owner,
      },
        (error, result) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            // this.setState({ show: true, });
            console.log(result);
          }
        });
    }
  }

  handleSubmit = (data, formRef) => {
    const { listId } = this.state;
    const { item } = data;
    const createdAt = new Date();
    const owner = Meteor.user().username;

    Meteor.call(addItemMethod, {
      item,
      listId: listId,
      checked: false,
      createdAt: createdAt,
      owner: owner,
    },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          formRef.reset();
        }
      });
  }

  render = () => {
    let fRef = null;
    return (
      <Container id='add-list-item'>
        <Header as='h3'>Create a List</Header>
        <AutoForm
          schema={bridge}
          onSubmit={data => this.handleListSubmit(data)}
        >
          <TextField
            className='list-input'
            id='name'
            placeholder='Give your list a name'
            name='name'
          />
          <Button
            className='list-button'
            type='submit'
            size='small'
            icon
          >
            <Icon name='save' size='big' />
          </Button>
        </AutoForm>
        < AutoForm
          ref={ref => { fRef = ref; }
          }
          schema={bridge}
          onSubmit={data => this.handleSubmit(data, fRef)}
        >
          <TextField
            className='list-input'
            placeholder='Type to add to list'
            name='item'
          />
          <Button
            className='list-button'
            type='submit'
            size='small'
            icon
          >
            <Icon name='plus square' size='big' />
          </Button>
          <Segment>
            <ListItems listId={this.state.listId} handleListId={this.handleListId} handleChange={this.handleChange} />
          </Segment>

          <Button
            onClick={this.props.handleClose}
            floated='right'
          >
            Save/Close
          </Button>
        </AutoForm>
      </Container>
    );
  }
}

AddListItem.propTypes = {
  handleClose: PropTypes.func.isRequired,
  ready: PropTypes.bool.isRequired,
};

const AddListItemContainer = withTracker(() => {
  const sub1 = Meteor.subscribe(Items.userPublicationName);
  const sub2 = Meteor.subscribe(Lists.userPublicationName);
  return {
    // incompleteCount: Items.collection.find({ checked: { $ne: true } }).count(),
    ready: sub1.ready() && sub2.ready(),
  };
})(AddListItem);

export default withRouter(AddListItemContainer);
