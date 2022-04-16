import React from 'react';
import { Container, Header, Button, Modal } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, DateField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import MultiSelectField from '../form-controllers/MultiSelectField';
import { Tasks } from '../../api/task/TaskCollection';
import { Items } from '../../api/item/ItemCollection';
import { Lists } from '../../api/list/ListCollection';
import { Tags } from '../../api/tag/TagCollection';
import AddListItem from './list-form/AddListItem';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  task: String,
  listName: { type: Array, optional: true },
  'listName.$': String,
  dueDate: { type: String, optional: true },
  note: { type: String, optional: true },
  tags: { type: Array, optional: true },
  'tags.$': String,
});

// const userTags = Tags.collection.find().fetch();
// const tagOptions = userTags.map((tag) => ({
//   key: tag._id,
//   label: tag.tagName,
//   text: tag.tagName,
//   value: tag.tagName,
// }));

/** Renders the Page for adding a document. */
class AddTask extends React.Component {
  state = {
    modalOpen: false,
    selectedLists: '',
    selectedTags: '',
    tagOptions: [],

  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleSelectList = (list) => {
    this.setState({ selectedLists: list }, () => {
      console.log('handle selectedLists: ', this.state.selectedLists);
    })
  }

  handleAddNewTag = (e, { value }) => {
    this.setState((prevState) => ({
      tagOptions: [{ text: value, value }, ...prevState.tagOptions],
    }));
  }

  handleSelectTag = (tag) => {
    this.setState({ selectedTags: tag }, () => {
      console.log('handle selectedTags: ', this.state.selectedTags);
    })
  }

  // handleChange = (e, { value }) => this.setState({ selectedTags: value });


  /** On submit, insert the data. */
  submit = (data, formRef) => {
    const { task, dueDate, note } = data;
    const listNames = this.state.selectedLists;
    const tags = this.state.selectedTags;
    const owner = Meteor.user().username;
    tags.forEach(tag => {
      Tags.collection.insert({ tagName: tag });
    });
    const taskId = Tasks.collection.insert({ task: task, dueDate: dueDate, note: note, owner: owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          console.log('selectedLists: ', this.state.selectedLists);
          console.log('selectedTag: ', this.state.selectedTags);
          Tasks.collection.update({ _id: taskId }, { $addToSet: { 'listName': { $each: listNames } } });
          Tasks.collection.update({ _id: taskId }, { $addToSet: { 'tags': { $each: tags } } });
          swal('Success', 'Task added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render = () => {
    let fRef = null;

    const listOptions = this.props.userLists.map((list) => ({
      key: list._id,
      label: list.name,
      text: list.name,
      value: list.name,
    }));

    const tagOptions = this.props.userTags.map((tag) => ({
      key: tag._id,
      label: tag.tagName,
      text: tag.tagName,
      value: tag.tagName,
    }));

    const bridge = new SimpleSchema2Bridge(formSchema);

    return (
      <Container>
        <Header as='h3'>Add a Task</Header>
        <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
          <TextField id="task-name" name='task' placeholder='Task name' />
          <DateField id="task-date" name='dueDate' max={new Date(2100, 1, 1)} min={new Date(2000, 1, 1)} />
          <MultiSelectField
            id="task-lists"
            name='listName'
            allowAdditions={false}
            options={listOptions}
            onChange={this.handleSelectList}
            value={this.state.selectedLists || []}
            placeholder={'Select list(s) for this task'}
            

          />
          <div>
            <Button onClick={this.handleOpen}>Create a list</Button>
            <Modal
              open={this.state.modalOpen}
              onClose={this.handleClose}
              closeIcon
              size='small'
            >
              <Modal.Content>
                <AddListItem />
                <br />
                <Button
                  onClick={this.handleClose}
                  floated='right'
                >
                  Save/Close
                </Button>
              </Modal.Content>
            </Modal>
          </div>
          <TextField id="task-note" name='note' />
          <MultiSelectField
            id="task-tags"
            name='tags'
            options={tagOptions}
            allowAdditions={true}
            onChange={this.handleSelectTag}
            onAddItem={(e, data) => this.handleAddNewTag(data.value)}
            value={this.state.selectedTags || []}
            placeholder={'Select tag(s) or type to add new tags'}
          />
          <ErrorsField />
          <SubmitField id="task-submit" value='Submit' />
        </AutoForm>
      </Container>

    );
  }
}



AddTask.propTypes = {
  ready: PropTypes.bool.isRequired,
  userLists: PropTypes.array,
  userTags: PropTypes.array,
};

const AddTaskContainer = withTracker(() => {
  const sub1 = Meteor.subscribe(Tasks.userPublicationName);
  const sub2 = Meteor.subscribe(Lists.userPublicationName);
  const sub3 = Meteor.subscribe(Items.userPublicationName);
  const sub4 = Meteor.subscribe(Tags.userPublicationName);
  return {
    userLists: Lists.collection.find().fetch(),
    userTags: Tags.collection.find().fetch(),
    items: Items.collection.find({}, { sort: { createdAt: -1 } }).fetch(),
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
  };
})(AddTask);

export default withRouter(AddTaskContainer);
