import React, { useEffect, useState } from 'react';
import { Button, Header, Icon, List, Loader, Segment, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Lists } from '../../api/list/ListCollection';
import { Items } from '../../api/item/ItemCollection';
import AddListItem from './list-form/AddListItem';
import ListListItem from './ListListItem';

const UserLists= ({ ready, lists, items }) => {
  if (ready) {
    const [modalOpen, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [userLists, setUserLists] = useState([]);
    useEffect(() => {
      setUserLists(lists);
    }, [lists]);

    useEffect(() => {
      let userLists = JSON.parse(JSON.stringify(lists));
      setUserLists(userLists);
    }, [lists]);

    return (
      <Segment id="user-agenda" raised>
        <Modal
          closeIcon
          size='small'
          open={modalOpen}
          onClose={handleClose}
          onOpen={handleOpen}
          trigger={
            <Button circular icon attached="top" inverted onClick={handleOpen}>
              <Icon name='add circle' /> Add List
            </Button>
          }
        >
          <Modal.Content>
            <AddListItem />
          </Modal.Content>
        </Modal>
        <Header as='h2' attached='top'>
      Lists
        </Header>
        <List celled verticalAlign='middle'>
          {userLists.map((list) => <ListListItem key={list._id} list={list}
          items={items.filter(item => (item.listId === list._id))} />)}
        </List>
      </Segment>
    );
  }
  return (<Loader active>Getting data</Loader>);
};

// Require a document to be passed to this component.
UserLists.propTypes = {
  lists: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withTracker(() => {
  // Get access to Stuff documents.
  const sub1 = Meteor.subscribe(Lists.userPublicationName);
  const sub2 = Meteor.subscribe(Items.userPublicationName);
  // Determine if the subscription is ready
  const ready = sub1.ready() && sub2.ready();
  // Get the document
  const lists = Lists.collection.find({}).fetch();
  const items = Items.collection.find({}).fetch();

  return {
    // tasks,
    lists,
    items,
    ready,
  };
})(UserLists);
