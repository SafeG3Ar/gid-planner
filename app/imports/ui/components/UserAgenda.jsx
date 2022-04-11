import React from 'react';
import { Button, Header, Icon, List, Loader, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../../api/task/TaskCollection';
import TaskItem from './TaskItem';

class UserAgenda extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return (
      <Segment id="user-agenda" raised>
        {/* This is the TOMORROW List */}
        <Button circular icon attached="top" inverted>
          <Icon name='add circle'/> Add Task
        </Button>
        <Header as='h2' attached='top'>
      Today
          <Header.Subheader>{today.toDateString()}</Header.Subheader>
        </Header>
        {/* Map List for Today */}
        <List celled verticalAlign='middle'>
          {this.props.tasks.map((task) => <TaskItem key={task._id} task={task} />)}
        </List>

        {/* This is the TOMORROW List */}
        <Header className='agenda-title' as='h2' attached='top'>
      Tomorrow
          <Header.Subheader>{tomorrow.toDateString()}</Header.Subheader>
        </Header>
        <List divided verticalAlign='middle'>
          {this.props.tasks.map((task) => <TaskItem key={task._id} task={task} />)}
        </List>
      </Segment>
    );
  }
}

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
