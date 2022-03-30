import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Tasks } from '../../api/task/TaskCollection';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class TaskItem extends React.Component {
  removeItem(docID) {
    Tasks.collection.remove(docID);
  }

  listing(element) {
    return element;
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.task.task}</Table.Cell>
        <Table.Cell>{this.props.task.listName}</Table.Cell>
        <Table.Cell>{this.props.task.dueDate}</Table.Cell>
        <Table.Cell>{this.props.task.tags}</Table.Cell>
        <Table.Cell>{this.props.task.owner}</Table.Cell>
        <Table.Cell>
          <Button icon onClick={() => this.removeItem(this.props.task._id)}>
            <Icon name = "trash" />
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
TaskItem.propTypes = {
  task: PropTypes.shape({
    task: PropTypes.string,
    listName: PropTypes.array,
    dueDate: PropTypes.string,
    tags: PropTypes.array,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(TaskItem);
