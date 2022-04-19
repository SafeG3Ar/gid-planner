import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Container, Header, List, Icon, Divider } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Items } from '../../../api/item/ItemCollection';
import { Lists } from '../../../api/list/ListCollection';
import ListItem from './ListItem';

class ListItems extends React.Component {

  // state = { show: false }

  // showCompleted = () => {
  //   if (this.props.checkedItems.length == 0) {
  //     this.setState({ show: false })
  //   }
  //   else {
  //     this.setState({ show: true }, () => console.log('showComplete', this.props.checkedItems))
  //   }
  // }

  // hideCompleted = () => {
  //     this.setState({ hideCompleted: ! this.state.hideCompleted });
  // }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render = () => ((this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>)

  /** Render the page once subscriptions have been received. */
  renderPage = () => {
    const { handleListId, handleChange } = this.props;
    const listName = _.pluck(Lists.collection.find({ _id: this.props.listId }).fetch(), 'name');
    return (
      <div>
        <Header as='h3' icon textAlign='center'>
          {listName}
        </Header>
        <Divider />
        <List>
          {this.props.items.filter(item => item.listId === this.props.listId).map((item) => (
            <ListItem
              key={item._id}
              item={item}
              listId={this.props.listId}
              handleListId={handleListId}
              handleChange={this.handleChange}
            />
          ))
          }
        </List>
        <div>
          <List>
            {this.props.checkedItems.filter(item => item.listId === this.props.listId).map((item) => (
              <ListItem
                key={item._id}
                item={item}
                listId={this.props.listId}
                handleListId={handleListId}
                handleChange={handleChange}
              />
            ))
            }
          </List>
        </div>
      </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListItems.propTypes = {
  listId: PropTypes.string,
  handleChange: PropTypes.func,
  handleListId: PropTypes.func,
  items: PropTypes.array.isRequired,
  checkedItems: PropTypes.array,
  lists: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const ListItemsContainer = withTracker(() => {
  // Get access to Items documents.
  const sub1 = Meteor.subscribe(Items.userPublicationName);
  const sub2 = Meteor.subscribe(Lists.userPublicationName);
  return {
    items: Items.collection.find({ checked: false }, { sort: { createdAt: -1 } }).fetch(),
    checkedItems: Items.collection.find({ checked: true }).fetch(),
    incompleteCount: Items.collection.find({ checked: { $ne: true } }).count(),
    lists: Lists.collection.find({}).fetch(),
    ready: sub1.ready() && sub2.ready(),
  };
})(ListItems);

export default withRouter(ListItemsContainer);
