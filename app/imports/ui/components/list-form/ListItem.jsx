import React from 'react';
import { List, Checkbox, Container, Button, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import { _ } from 'meteor/underscore';
import { Items } from '../../../api/item/ItemCollection';
// import { removeItemMethod, setCheckedMethod } from '../../startup/both/Methods';

const listElementStyles = {
  color: 'black',
  fontSize: 16,
  lineHeight: '18px',
  verticalAlign: 'middle',
  // display: 'block',
};

const listElementCheckedStyles = {
  ...listElementStyles,
  textDecoration: 'line-through',
};

/** Renders the Page for adding a document. */
class ListItem extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  setOpen(value) {
    this.setState({ open: value });
  }

  removeThisItem = (id) => {
    Items.collection.remove(id);
  }

  handleChecked = (id) => {
    Items.collection.update(
      id, { $set: { checked: !this.props.item.checked } },
    );

  }

  render = () => {
    const listStyles = this.props.item.checked ? listElementCheckedStyles : listElementStyles;
    return (
      <Container>
        <List celled divided animated verticalAlign='middle' fluid='true'>
          <List.Item>
            <List.Content>
              <Button
                className='delete-item-button'
                floated='right'
                size='tiny'
                icon
                onClick={() => this.removeThisItem(this.props.item._id)}
              >
                <Icon name='remove' color='red' size='large' />
              </Button>
            </List.Content>
            <List.Content floated='left'>
              <Checkbox
                size='small'
                onClick={() => this.handleChecked(this.props.item._id)}
                defaultChecked={false}
                // value={this.props.item.item}
              />
            </List.Content>
            <List.Content style={listStyles}>
              {this.props.item.item}
            </List.Content>
          </List.Item>
        </List>
      </Container>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub1 = Meteor.subscribe(Items.userPublicationName);
  return {
    ready: sub1.ready(),
  };
})(ListItem);
