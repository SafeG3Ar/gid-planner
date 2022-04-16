import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Container, Header, List } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Items } from '../../../api/item/ItemCollection';
import { Lists } from '../../../api/list/ListCollection';
import ListItem from './ListItem';

class ListItems extends React.Component {

  // state = { hideCompleted: false }

  // hideCompleted = () => {
  //     this.setState({ hideCompleted: ! this.state.hideCompleted });
  // }

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render = () => ((this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>)

    /** Render the page once subscriptions have been received. */
    renderPage = () => {
      const { handleListId, handleChange } = this.props;
      const listName = _.pluck(Lists.collection.find({ _id: this.props.listId }).fetch(), 'name');
      // console.log('listitem renderpage', this.props.items.filter(item => item.listId === this.props.listId))
      return (
        <Container>
          <Header as='h3'>
            {listName}
          </Header>
          <List>
            {this.props.items.filter(item => item.listId === this.props.listId).map((item) => (
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
        </Container>
      );
    }
}

/** Require an array of Stuff documents in the props. */
ListItems.propTypes = {
  listId: PropTypes.string,
  handleChange: PropTypes.func,
  handleListId: PropTypes.func,
  items: PropTypes.array.isRequired,
  lists: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const ListItemsContainer = withTracker(() => {
  // Get access to Items documents.
  const sub1 = Meteor.subscribe(Items.userPublicationName);
  const sub2 = Meteor.subscribe(Lists.userPublicationName);
  return {
    items: Items.collection.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Items.collection.find({ checked: { $ne: true } }).count(),
    lists: Lists.collection.find({}).fetch(),
    ready: sub1.ready() && sub2.ready(),
  };
})(ListItems);

export default withRouter(ListItemsContainer);
