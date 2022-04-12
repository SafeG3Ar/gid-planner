import React, { useEffect, useState } from 'react';
import { Button, Header, Icon, List, Loader, Segment, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import AddTask from './AddTask';
import { Tasks } from '../../api/task/TaskCollection';
import TaskListItem from './TaskListItem';

const today = moment();
const tomorrow = today.clone().add(1, 'days');

const UserAgenda = ({ ready, tasks }) => {
  if (ready) {
    const [modalOpen, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [todayTasks, setTodayTasks] = useState([]);
    useEffect(() => {
      setTodayTasks(tasks);
    }, [tasks]);

    const [tomorrowTasks, setTomorrowTasks] = useState([]);
    useEffect(() => {
      setTomorrowTasks(tasks);
    }, [tasks]);

    useEffect(() => {
      let todayFilterTask = JSON.parse(JSON.stringify(tasks));
      let tomorrowFilterTasks = JSON.parse(JSON.stringify(tasks));

      todayFilterTask = todayFilterTask.filter((task) => task.dueDate === today.format('YYYY-MM-DD'));
      tomorrowFilterTasks = tomorrowFilterTasks.filter((task) => task.dueDate === tomorrow.format('YYYY-MM-DD'));

      setTodayTasks(todayFilterTask);
      setTomorrowTasks(tomorrowFilterTasks);
    });

    return (
      <Segment id="user-agenda" raised>
        {/* This is the TODAY List */}
        {/* This is the TOMORROW List */}
        <Modal
          closeIcon
          size='small'
          open={modalOpen}
          onClose={handleClose}
          onOpen={handleOpen}
          trigger={
            <Button circular icon attached="top" inverted onClick={handleOpen}>
              <Icon name='add circle' /> Add Task
            </Button>
          }
        >
          <Modal.Content>
            <AddTask />
          </Modal.Content>
        </Modal>
        <Header as='h2' attached='top'>
      Today
          <Header.Subheader>{today.format('MMMM DD, YYYY')}</Header.Subheader>
        </Header>
        {/* Map List for Today */}
        <List celled verticalAlign='middle'>
          {todayTasks.map((task) => <TaskListItem key={task._id} task={task} />)}
        </List>

        {/* This is the TOMORROW List */}
        <Header className='agenda-title' as='h2' attached='top'>
      Tomorrow
          <Header.Subheader>{tomorrow.format('MMMM DD, YYYY')}</Header.Subheader>
        </Header>
        <List divided verticalAlign='middle'>
          {tomorrowTasks.map((task) => <TaskListItem key={task._id} task={task} />)}
        </List>
      </Segment>
    );
  }
  return (<Loader active>Getting data</Loader>);
};

// Require a document to be passed to this component.
UserAgenda.propTypes = {
  tasks: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Tasks.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const tasks = Tasks.collection.find({}).fetch();
  return {
    tasks,
    ready,
  };
})(UserAgenda);
