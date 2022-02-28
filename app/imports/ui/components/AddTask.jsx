import React from 'react';
import Box from '@mui/material/Box';
import { AutoForm, ErrorsField, SubmitField, TextField, DateField, SelectField, LongTextField } from 'uniforms-material';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Tasks } from '../../api/task/TaskCollection';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
    task: { type: String },
    date: { type: Date },
    listName: { type: Array },
    'listName.$': String,
    note: { type: String },
    tags: { type: Array, optional: true },
    'tags.$': String,
    owner: { type: String } ,
});

/** Renders the Page for adding a document. */
class AddTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedList: null,
            selectedTags: null,
        };
        this.handleListChange = this.handleListChange.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
    }

  /** On submit, insert the data. */
    submit = (data, formRef) => {
        const { task, date, listName, note, tags } = data;
        const owner = Meteor.user().username;
        Tasks.collection.insert({ task, date, listName, note, tags, owner },
        (error) => {
            if (error) {
            swal('Error', error.message, 'error');
            } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
            }
        });
    }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (this.props.ready) ?
        this.addTaskForm()
        : <Loader active>Getting data</Loader>;
  }

  addTaskForm = () => {
    let fRef = null;
    const bridge = new SimpleSchema2Bridge(formSchema);
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <div>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
                <TextField id="task-name" name='task'/>
                <DateField
                    id="task-date"
                    name='date'
                    max={new Date(2100, 1, 1)}
                    min={new Date(2000, 1, 1)}
                />
                <SelectField id="task-list" name='listName'/>
                <LongTextField id="task-note" name='note'/>
                <SelectField id="task-tags" name='tags'/>
                <SubmitField id="task-submit" value='Submit'/>
                <ErrorsField/>
            </AutoForm>
          </div>
        </Box>
    );
  }
};

AddTask.propTypes = {
    ready: PropTypes.bool.isRequired,
  };

const AddTaskContainer = withTracker(() => {
    const sub1 = Meteor.subscribe(Tasks.userPublicationName);
    return {
        ready: sub1.ready(),
    };
})(AddTask);

export default withRouter(AddTaskContainer);
