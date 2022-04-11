import React from 'react';
import { List, Label, Checkbox } from 'semantic-ui-react';
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
      <List.Item>
        <List.Icon><Checkbox/></List.Icon>
        <List.Content>
          <List.Header as='a'>{this.props.task.task}</List.Header>
          <List horizontal>
            <List.Item>
              <Label as='a' size='mini'>
                {this.props.task.tags}<Label.Detail>{this.props.task.dueDate}</Label.Detail>
              </Label>
            </List.Item>
            <List.Item>
              <Label as='a' color='black' size='mini'>{this.props.task.listName}</Label>
            </List.Item>
          </List>
        </List.Content>
      </List.Item>

    );
  }
}

// Require a document to be passed to this component.
TaskItem.propTypes = {
  task: PropTypes.shape({
    task: PropTypes.string,
    dueDate: PropTypes.string,
    listName: PropTypes.array,
    tags: PropTypes.array,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(TaskItem);
