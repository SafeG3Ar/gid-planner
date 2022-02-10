import React from 'react';
import { AutoForm, ErrorsField, SubmitField } from 'uniforms-material';
import { Box, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { taskDefineMethod } from '../../api/task/TaskCollection.methods';


const formSchema = new SimpleSchema({
    task: { type: String },
    listName: { type: Array },
    'listName.$': String,
    date: { type: Date },
    notes: { type: String, optional: true },
    // tags: { type: String, optional: true },
});

const [dateValue, setDateValue] = React.useState(new Date());

class AddTask extends React.Component {

    submit(data, formRef) {
        const { task,  listName, date, notes } = data;
        const owner = Meteor.user().username;
        taskDefineMethod.call({ task, listName, date, notes, owner },
            (error) => {
                if (error) {
                    swal('Error', error.message, 'error');
                } else {
                    swal('Success', 'Task added successfully', 'success');
                    formRef.reset();
                }
            });
    }

    render() {
        let fRef = null;

        return (
            <Grid container>
                <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
                    <Box
                        component='form'
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch ' },
                        }}
                        noValidate
                        autoComplete='off'
                    >
                        <div className='add-task-form'>
                            <TextField
                                task
                                id='task'
                                label='Task'
                            >
                            </TextField>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label='Date'
                                    value={dateValue}
                                    onChange={(newDateValue) => {
                                        setDateValue(newDateValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>

                            <TextField
                                notes
                                id='task-notes'
                                label='Notes'
                            >
                            </TextField>
                            {/* <TextField
                                tags
                                id='task-tags'
                                label='Tags'
                            >
                            </TextField> */}
                            <SubmitField value='Submit'/>
                            <ErrorsField/>

                        </div>
                    </Box>
                </AutoForm>
            </Grid>

        );
    }
}
export default AddTask;