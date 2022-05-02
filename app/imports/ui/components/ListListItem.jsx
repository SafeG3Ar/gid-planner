import React from 'react';
import { Button, Icon, List, Label, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Lists } from '../../api/list/ListCollection';
import { Items } from '../../api/item/ItemCollection';
import Item from './Item';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ListListItem extends React.Component {
  removeItem(id) {
    Lists.collection.remove(id);
  }

  listing(element) {
    return element;
  }

  render() {
    return (

      <List.Item>
        <Icon name='tasks' />
        <List.Content>
          <List.Header as='a'>{this.props.list.name}</List.Header>
          <List horizontal>
            <List.Item>
              <Label.Group as='a' size='mini'>
                {this.props.items.map((item, index ) => <Item key={index} item={item}/>)}
              </Label.Group>
            </List.Item>
          </List>
        </List.Content>
        <List.Icon>
          <Button className="deleteTask" icon onClick={() => this.removeItem(this.props.list._id)}>
            <Icon name="trash" />
          </Button>
        </List.Icon>
      </List.Item>
    );
  }
}

// Require a document to be passed to this component.
ListListItem.propTypes = {
  list: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ListListItem);
