import React from 'react';
import { Container, Header, Button, Modal } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, DateField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { _ } from 'meteor/underscore';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import MultiSelectField from '../form-controllers/MultiSelectField';
import { Tasks } from '../../api/task/TaskCollection';
import { Items } from '../../api/item/ItemCollection';
import { Lists } from '../../api/list/ListCollection';
import { Tags } from '../../api/tag/TagCollection';
import AddListItem from './list-form/AddListItem';
import { addTagMethod } from '../../startup/both/Methods';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  task: String,
  listName: { type: Array, optional: true },
  'listName.$': String,
  dueDate: { type: Date, optional: true },
  note: { type: String, optional: true },
  tags: { type: Array, optional: true },
  'tags.$': String,
});

/** Renders the Page for adding a document. */
class AddTask extends React.Component {
  state = {
    open: false,
    selectedLists: '',
    selectedTags: '',
    tagOptions: [],

  };

  handleOpen = (e) => {
    e.preventDefault();
    this.setState({ open: true });
  }

  handleClose = (e) => {
    e.preventDefault();
    this.setState({ open: false });
  }

  handleSelectList = (list) => {
    this.setState({ selectedLists: list }, () => {
      console.log('handle selectedLists: ', this.state.selectedLists);
    });
  }

  handleAddNewTag = (tag) => {
    this.setState(prevState => ({
      tagOptions: [...prevState.tagOptions, tag],
    }));
    Meteor.call(addTagMethod, {
      tagName: tag,
    },
    (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        console.log('handleAddNewTag', this.state.tagOptions);
      }
    });
  }

  handleSelectTag = (value) => {
    this.setState({ selectedTags: value }, () => {
      console.log('handle selectedTags: ', this.state.selectedTags);
      console.log('tagOptions state', this.state.tagOptions);
    });
  }

  /** On submit, insert the data. */
  submit = (data, formRef) => {
    const { task, dueDate, note } = data;
    const listNames = this.state.selectedLists;
    const tags = this.state.selectedTags;
    const owner = Meteor.user().username;
    const taskId = Tasks.collection.insert({ task: task, dueDate: dueDate, note: note, owner: owner },
      (taskerror) => {
        if (taskerror) {
          swal('Error', taskerror.message, 'error');
        } else {
          console.log('selectedLists: ', this.state.selectedLists);
          console.log('selectedTag: ', this.state.selectedTags);
          Tasks.collection.update({ _id: taskId }, { $addToSet: { listName: { $each: listNames } } });
          Tasks.collection.update({ _id: taskId }, { $addToSet: { tags: { $each: tags } } },
            (error) => {
              if (error) {
                swal('Error', error.message, 'error');
              } else {
                swal('Success', 'Task added successfully', 'success');
                formRef.reset();
                this.setState({ selectedLists: '' }, () => console.log(this.state.selectedLists));
                this.setState({ selectedTags: '' }, () => console.log(this.state.selectedTags));
              }
            });
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
        <Header as='h3'>Create a Task</Header>
        <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
          <TextField id="task-name" name='task' placeholder='Task name' />
          <DateField id="task-date" name='dueDate' max={new Date(2100, 1, 1)} min={new Date(2000, 1, 1)} />
          <MultiSelectField
            name='listName'
            label='List name(s)'
            allowAdditions='false'
            options={listOptions}
            onChange={this.handleSelectList}
            value={this.state.selectedLists || []}
            placeholder={'Select list(s) for this task or create a new one below'}
            inputRef={fRef}

          />
          <div>
            <Modal
              size='small'
              onClose={this.handleClose}
              trigger={ <Button id='create-list' onClick={this.handleOpen}>Create a list</Button>}
              closeIcon
            >
              <Modal.Content>
                <AddListItem handleClose={this.handleClose} />
              </Modal.Content>
            </Modal>
          </div>
          <TextField id="task-note" name='note'/>
          <MultiSelectField
            name='tags'
            options={tagOptions}
            allowAdditions='true'
            onAddItem={this.handleAddNewTag}
            onChange={this.handleSelectTag}
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
