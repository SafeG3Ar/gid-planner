import React from 'react';
import { Button, Checkbox, Icon, List, Label, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Tasks } from '../../api/task/TaskCollection';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class TaskListItem extends React.Component {
  removeItem(docID) {
    Tasks.collection.remove(docID);
  }

  listing(element) {
    return element;
  }

  render() {
    return (

      <List.Item>
        <List.Icon><Checkbox /></List.Icon>
        <List.Content>
          <List.Header as='a'>{this.props.task.task}</List.Header>
          <List horizontal>
            <List.Item>
              <Label as='a' size='mini'>
                {this.props.task.tags}<Label.Detail>{moment(this.props.task.dueDate).format('DD MMMM')}</Label.Detail>
              </Label>
            </List.Item>
            <List.Item>
              <Label as='a' color='black' size='mini'>{this.props.task.listName}</Label>
            </List.Item>
            <List.Item>
              <Popup
                trigger={<Icon name='eye' />}
                content={this.props.task.note}
                inverted
              /> Note
            </List.Item>
          </List>
        </List.Content>
        <List.Icon>
          <Button className = "deleteTask" icon onClick={() => this.removeItem(this.props.task._id)}>
            <Icon name="trash" />
          </Button>
        </List.Icon>
      </List.Item>
    );
  }
}

// Require a document to be passed to this component.
TaskListItem.propTypes = {
  task: PropTypes.shape({
    task: PropTypes.string,
    dueDate: PropTypes.string,
    note: PropTypes.string,
    listName: PropTypes.array,
    tags: PropTypes.array,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(TaskListItem);
