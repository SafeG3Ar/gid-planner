import React from 'react';
import { List, Checkbox, Container, Button, Icon } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, DateField, SelectField, LongTextField } from 'uniforms-material';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Items } from '../../api/item/ItemCollection';
import { Lists } from '../../api/list/ListCollection';
import { removeItemMethod, setCheckedMethod } from '../../startup/both/Methods';

const listElementStyles = {
    color: 'black',
    fontSize: 18,
    lineHeight: '24px',
}

const listElementCheckedStyles = {
    ...listElementStyles,
    textDecoration: 'line-through',
}

/** Renders the Page for adding a document. */
class ListItem extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => this.setState({ open: true });

    handleClose = () => this.setState({ open: false });

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         item: '',
    //         open: false,
    //     };
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleRemove = this.handleRemove.bind(this);
    //     this.handleCheck = this.handleCheck.bind(this);
    // }

    // handleChange(e) {
    //     this.setState({
    //         item: e.target.value,
    //     });
    // }

    setOpen(value) {
        this.setState({ open: value });
    }

    removeThisItem = () => {
        Meteor.call(removeItemMethod, this.props.item._id);
    }

    handleChecked = () => {
        Items.collection.update(
            this.props.item._id, { $set: { checked: ! this.props.item.checked } });
    }

    render = () => {
        // const { item } = this.props;
        // const itemClassName = this.props.item.checked;
        // const listStyles = this.props.checked? listElementStyles: listElementCheckedStyles;
        return (
            <Container>
                <List celled verticalAlign='middle' fluid='true'>
                    <List.Item>
                        <List.Content>
                            <Button
                                floated='right'
                                size='mini'
                                icon
                                onClick={this.removeThisItem}
                            >
                                <Icon name='remove' color='red' />
                            </Button>
                        </List.Content>
                        <List.Content floated='left'>
                            <Checkbox
                                checked={this.props.item.checked}
                                onClick={this.handleChecked}
                            />
                        </List.Content>
                        <List.Content>
                            {this.props.item.item}
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
};

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
    ready: PropTypes.bool.isRequired,
};

const ListItemContainer = withTracker(() => {
    const sub1 = Meteor.subscribe(Items.userPublicationName);
    return {
        // item: Items.collection.findOne({}),
        ready: sub1.ready(),
    };
})(ListItem);

export default withRouter(ListItemContainer);
