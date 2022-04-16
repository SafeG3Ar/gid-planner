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
  lineHeight: '24px',
};

const listElementCheckedStyles = {
  ...listElementStyles,
  textDecoration: 'line-through',
};

/** Renders the Page for adding a document. */
class ListItem extends React.Component {
    state = {
      open: false,
      // checked: false,
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
      // const { item } = this.props;
      // const itemClassName = this.props.item.checked;
      const listStyles = this.props.item.checked ? listElementCheckedStyles : listElementStyles;
      return (
        <Container>
          <List celled verticalAlign='middle' fluid='true'>
            <List.Item>
              <List.Content>
                <Button
                  floated='right'
                  size='mini'
                  icon
                  onClick={() => this.removeThisItem(this.props.item._id)}
                >
                  <Icon name='remove' color='red' />
                </Button>
              </List.Content>
              <List.Content floated='left'>
                <Checkbox
                  onClick={() => this.handleChecked(this.props.item._id)}
                  // checked={this.props.item.checked}
                  defaultChecked={false}
                />
              </List.Content>
              <List.Content>
                <li style={listStyles}>
                  {this.props.item.item}
                </li>

              </List.Content>
            </List.Item>
          </List>
        </Container>
      // <Feed.Event>
      //     <Feed.Content>
      //         <Feed.Summary>
      //             {this.props.item.item}
      //         </Feed.Summary>
      //     </Feed.Content>
      // </Feed.Event>
      // <li className={itemClassName}>
      //     <button className='remove' onClick={this.deleteThisItem}>
      //         &times;
      //     </button>
      //     <input
      //         type='checkbox'
      //         readOnly={true}
      //         checked={this.props.item.checked}
      //         onClick={this.toggleChecked}
      //     />
      //     <span className='text'>
      //         {this.props.item.text}
      //     </span>
      //     {/* <li style={listStyles}>
      //                 {item}
      //             </li> */}
      // </li>
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
