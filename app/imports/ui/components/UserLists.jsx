import React, { useEffect, useState } from 'react';
import { Button, Header, Icon, List, Loader, Segment, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../../api/task/TaskCollection';
import { Lists } from '../../api/list/ListCollection';
import { Items } from '../../api/item/ItemCollection';
import TaskListItem from './TaskListItem';
import AddListItem from './list-form/AddListItem';

const today = moment();
const tomorrow = today.clone().add(1, 'days');
const todayDate = today.format('YYYY-MM-DD');
const tomDate = tomorrow.format('YYYY-MM-DD');

const UserLists= ({ ready, tasks }) => {
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
      todayFilterTask = todayFilterTask.filter((task) => moment(task.dueDate).format('YYYY-MM-DD') === (todayDate));
      tomorrowFilterTasks = tomorrowFilterTasks.filter((task) => moment(task.dueDate).format('YYYY-MM-DD') === tomDate);

      setTodayTasks(todayFilterTask);
      setTomorrowTasks(tomorrowFilterTasks);
    }, [today, tomorrow, tasks]);

    return (
      <Segment id="user-agenda" raised>
        <Modal
          closeIcon
          size='small'
          open={modalOpen}
          onClose={handleClose}
          onOpen={handleOpen}
          trigger={
            <Button circular icon attached="top" inverted onClick={handleOpen}>
              <Icon name='add circle' /> Add List
            </Button>
          }
        >
          <Modal.Content>
            <AddListItem />
          </Modal.Content>
        </Modal>
        <Header as='h2' attached='top'>
      Lists
        </Header>
        {/* Map List for Today */}
        <List celled verticalAlign='middle'>
          {todayTasks.map((task) => <TaskListItem key={task._id} task={task} />)}
        </List>
      </Segment>
    );
  }
  return (<Loader active>Getting data</Loader>);
};

// Require a document to be passed to this component.
UserLists.propTypes = {
  tasks: PropTypes.array.isRequired,
  lists: PropTypes.array,
  items: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withTracker(() => {
  // Get access to Stuff documents.
  const sub1 = Meteor.subscribe(Tasks.userPublicationName);
  const sub2 = Meteor.subscribe(Lists.userPublicationName);
  const sub3 = Meteor.subscribe(Items.userPublicationName);
  // Determine if the subscription is ready
  const ready = sub1.ready() && sub2.ready() && sub3.ready();
  // Get the document
  const tasks = Tasks.collection.find({}).fetch();
  const lists = Lists.collection.find({}).fetch();
  const items = Items.collection.find({}).fetch();

  return {
    tasks,
    lists,
    items,
    ready,
  };
})(UserLists);
