import React from 'react';
import { Loader, Table, Container, Header } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../../api/task/TaskCollection';
import TaskItem from '../components/TaskItem';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class TaskList extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Tasks</Header>
        <Table celled basic='very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Task</Table.HeaderCell>
              <Table.HeaderCell>Lists</Table.HeaderCell>
              <Table.HeaderCell>Tags</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.tasks.map((task) => <TaskItem key={task._id} task={task} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require a document to be passed to this component.

TaskList.propTypes = {
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
})(TaskList);
