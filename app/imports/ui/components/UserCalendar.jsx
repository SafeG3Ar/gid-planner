import React, { useEffect, useState } from 'react';
import { Divider, Header, List, Loader, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CalendarPicker from '@mui/lab/CalendarPicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../../api/task/TaskCollection';
import TaskListItem from './TaskListItem';

/* date={selectedDate} {date => setSelectedDateFilter(date)} */

const UserCalendar = ({ ready, tasks }) => {
  if (ready) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filterTasks, setfilterTasks] = useState([]);
    useEffect(() => {
      setfilterTasks(tasks);
    }, [tasks]);

    useEffect(() => {
      let filterTask = JSON.parse(JSON.stringify(tasks));
      const filterDate = moment(selectedDate).format('YYYY-MM-DD');
      filterTask = filterTask.filter((task) => task.dueDate === filterDate);
      setfilterTasks(filterTask);
    });

    // const handleDateFilter = (event, { value }) => setSelectedDateFilter(value);

    return (
      <Segment id="user-calendar" padded='very' raised>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CalendarPicker
            date={selectedDate}
            onChange={date => setSelectedDate(date)} inverted
          />
        </LocalizationProvider>
        <Header attached='top'as='h1'>{moment(selectedDate).format('MMMM DD, YYYY')}</Header>
        <Divider />
        <List celled verticalAlign='middle'>
          {filterTasks.map((task) => <TaskListItem key={task._id} task={task} />)}
        </List>
      </Segment>
    );
  }
  return (<Loader active>Getting data</Loader>);
};

// Require a document to be passed to this component.
UserCalendar.propTypes = {
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
})(UserCalendar);
