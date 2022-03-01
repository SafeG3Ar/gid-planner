import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { AutoForm, ErrorsField, SubmitField, TextField, DateField, SelectField, LongTextField } from 'uniforms-material';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Tasks } from '../../api/task/TaskCollection';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
    task: { type: String },
    date: { type: Date },
    listName: { type: String, optional: true },
    note: { type: String, optional: true },
    tags: { type: String, optional: true, allowedValues: ['Important', 'Critical', 'Personal', 'Work'], },
    // 'tags.$': String,
});

/** Renders the Page for adding a document. */
class AddTask extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         open: false,
    //     };
    //     this.handleListChange = this.handleListChange.bind(this);
    //     this.handleTagsChange = this.handleTagsChange.bind(this);
    // }

    /** On submit, insert the data. */
    submit = (data, formRef) => {
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
    // render() {
    //     return (this.props.ready) ?
    //         this.addTaskForm()
    //         : <Loader active>Getting data</Loader>;
    // }

    render() {
        let fRef = null;
        const bridge = new SimpleSchema2Bridge(formSchema);
        return (
            <Container maxWidth='sm'>
                <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <TextField id="task-name" name='task' />
                        <DateField
                            id="task-date"
                            name='date'
                            max={new Date(2100, 1, 1)}
                            min={new Date(2000, 1, 1)}
                        />
                        {/* <SelectField id="task-list" name='listName'/> */}
                        <LongTextField id="task-note" name='note' />
                        <SelectField id="task-tags" name='tags' />
                        <ErrorsField />
                        <SubmitField id="task-submit" value='Submit' />
                    </Box>
                </AutoForm>
            </Container>
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
