import React from 'react';
import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { AutoForm, ErrorsField, SubmitField, TextField, DateField, SelectField, LongTextField } from 'uniforms-material';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Tasks } from '../../api/task/TaskCollection';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
    task: { type: String },
    date: { type: Date },
    listName: { type: Array, optional: true },
    'listName.$': String,
    note: { type: String },
    tags: { type: String, optional: true, allowedValues: ['Important', 'Critical', 'Personal', 'Work'],},
    // 'tags.$': String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddTask extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { task, date, listName, note, tags } = data;
    const owner = Meteor.user()._id;
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
    let fRef = null;
    return (
        <Container maxWidth='md'>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <TextField id="task-name" name='task'/>
                    <DateField id="task-date" name='date'/>
                    {/* <SelectField id="task-list" name='listName'/> */}
                    <LongTextField id="task-note" name='note'/>
                    <SelectField id="task-tags" name='tags'/>
                    <SubmitField id="task-submit" value='Submit'/>
                    <ErrorsField/>
                </Box>
            </AutoForm>
        </Container>
    );
  }
}

AddTask.propTypes = {
    ready: PropTypes.bool.isRequired,
};
export default withTracker(() => {
    const sub1 = Meteor.subscribe(Tasks.userPublicationName);
    return {
        ready: sub1.ready(),
    };
})(AddTask);
