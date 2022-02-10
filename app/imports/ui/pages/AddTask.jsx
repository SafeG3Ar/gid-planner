import React from 'react';
import { AutoForm, ErrorsField, SubmitField } from 'uniforms-material';
import { Box, TextField } from '@mui/material';
import { AdapterDateFns, LocalizationProvider } from '@mui/lab';
import DatePicker from '@mui/lab/DatePicker';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { taskDefineMethod } from '../../api/task/TaskCollection.methods';


const formSchema = new SimpleSchema({
    title: { type: String },
    date: { type: Date },
    time: { type: String },
    description: { type: String, optional: true },
    tags: { type: String, optional: true },
});

class AddTask extends React.Component {
    submit(data, formRef) {
        const { title, date, time, description, tags } = data;
        const owner = Meteor.user().username;
        taskDefineMethod.call({ title, date, time, description, tags, owner },
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
        const [dateValue, setDateValue] = React.useState(null);
        const [TimeValue, setTimeValue] = React.useState(new Date());
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
                            <TextField>
                                title
                                id='task-title'
                                label='Title'
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

                            <TextField>
                                description
                                id='task-description'
                                label='Description'
                            </TextField>
                            <TextField>
                                tags
                                id='task-tags'
                                label='Tags'
                            </TextField>
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