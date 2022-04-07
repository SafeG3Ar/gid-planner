import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Container, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, DateField, HiddenField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Items } from '../../api/item/ItemCollection';
import { Lists } from '../../api/list/ListCollection';
// import { Lists } from '../../api/list/ListCollection';
import ListItem from './ListItem';

class ListItems extends React.Component {

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    /** Render the page once subscriptions have been received. */
    renderPage() {
        return (
            <Container>
                <Header as='h3'>
                    List
                    
                </Header>
                <ul>
                    {this.props.items.map((item) => <ListItem key={item._id} item={item} Items={Items} />)}
                </ul>
            </Container>
        );
    }
}

/** Require an array of Stuff documents in the props. */
ListItems.propTypes = {
    items: PropTypes.array.isRequired,
    list: PropTypes.object,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const ListItemsContainer = withTracker(() => {
    // Get access to Items documents.
    const sub1 = Meteor.subscribe(Items.userPublicationName);
    const sub2 = Meteor.subscribe(Lists.userPublicationName);
    return {
        items: Items.collection.find({}, { sort: { createdAt: -1 } }).fetch(),
        list: Lists.collection.find({}).fetch(),
        ready: sub1.ready() && sub2.ready(),
    };
})(ListItems);

export default withRouter(ListItemsContainer);