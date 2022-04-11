import React from 'react';
import { Grid, Container, Button, Icon, Input, Modal, Label } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, DateField, SelectField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Tasks } from '../../api/task/TaskCollection';
import { Lists } from '../../api/list/ListCollection';
import AddTask from '../components/AddTask';
import AddList from '../components/AddList';
import AddListItem from '../components/AddListItem';
import ListItems from '../components/ListItems';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
    task: { type: String },
    date: { type: Date },
    listName: { type: String, optional: true },
    note: { type: String, optional: true },
    tags: { type: String, optional: true, allowedValues: ['Important', 'Critical', 'Personal', 'Work'], },
    // 'tags.$': String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddTaskPage extends React.Component {
    state = {
        modalOpen: false,
        selectedList: '',
    };

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

    handleSelectList = (list) => {
        this.setState({
            selectedList: list,
        })
    }

    // handleListItems = (items) => {

    // }


    /** On submit, insert the data. */
    submit = (data, formRef) => {
        const { task, date, note, tags } = data;
        const listName = this.state.selectedList;
        const owner = Meteor.user().username;
        Tasks.collection.insert({ task, date, listName, note, tags, owner },
            (error) => {
                if (error) {
                    swal('Error', error.message, 'error');
                } else {
                    swal('Success', 'Task added successfully', 'success');
                    formRef.reset();
                }
            });
    }

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    render = () => {

        const listOptions = this.props.userLists.map((list) => ({
            key: list._id,
            label: list.name,
            value: list._id,
        }));

        let fRef = null;
        return (
            <Container>
                <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
                    <TextField id="task-name" name='task' placeholder='Task name' />
                    <DateField id="task-date" name='date' max={new Date(2100, 1, 1)} min={new Date(2000, 1, 1)} />
                    <SelectField
                        id="task-list"
                        name='listName'
                        options={listOptions}
                        value={this.state.selectedList}
                        onChange={this.handleSelectList}
                        placeholder='Select a list for this task'
                    />
                    <LongTextField id="task-note" name='note' />
                    <SelectField id="task-tags" name='tags' />
                    <ErrorsField />
                    <SubmitField id="task-submit" value='Submit' />
                </AutoForm>
                
                {/* <div>
                    <Button onClick={this.handleOpen}>Add Task</Button>
                    <Modal
                        open={this.state.modalOpen}
                        onClose={this.handleClose}
                    >
                        <Box sx={{ ...style, width: 400 }}>
                            <AddTask/>
                            <Button onClick={this.handleClose}>Close</Button>
                        </Box>
                    </Modal>
                </div> */}
                <div>
                    <Button onClick={this.handleOpen}>Create a list</Button>
                    <Modal
                        open={this.state.modalOpen}
                        onClose={this.handleClose}
                        closeIcon
                    >
                        <Modal.Content>
                            <ListItems />
                            <br/>
                            <Button
                                onClick={this.handleClose}
                                floated='right'
                            >
                                Save/Close
                            </Button>
                        </Modal.Content>
                    </Modal>
                </div>
            </Container>

        );
    }
}

AddTaskPage.propTypes = {
    ready: PropTypes.bool.isRequired,
    userLists: PropTypes.array,
};

const AddTaskPageContainer = withTracker(() => {
    const sub1 = Meteor.subscribe(Tasks.userPublicationName);
    const sub2 = Meteor.subscribe(Lists.userPublicationName);
    const sub3 = Meteor.subscribe(Items.userPublicationName);
    return {
        userLists: Lists.collection.find({}).fetch(),
        items: Items.collection.find({}, { sort: { createdAt: -1 } }).fetch(),
        ready: sub1.ready() && sub2.ready() && sub3.ready(),
    };
})(AddTaskPage);

export default withRouter (AddTaskPageContainer);
