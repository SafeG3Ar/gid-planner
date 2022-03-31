import React from 'react';
import { Container, Button, Input, Modal, Feed } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, DateField, SelectField, LongTextField } from 'uniforms-material';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Items } from '../../api/item/ItemCollection';
import { addItemMethod, removeItemMethod, setCheckedMethod } from '../../api/item/ItemCollection.methods';

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

    // toggleChecked() {
    //     Items.collection.update(this.props.item._id, {
    //         $set: { checked: !this.props.item.checked }
    //     });
    // }

    // removeThisItem() {
    //     Items.collection.remove(this.props.item._id);
    // }

    // handleCheck = () => {
    //     Meteor.call(setCheckedMethod, this.props.item._id, !this.props.item.checked);
    // }

    render() {
        // const { item } = this.props;
        const itemClassName = this.props.item.checked;
        // const listStyles = this.props.checked? listElementStyles: listElementCheckedStyles;
        return (
            <Feed.Event>
                <Feed.Content>
                    <Feed.Summary>
                        {this.props.item.item}
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
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
    // items: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

const ListItemContainer = withTracker(() => {
    const sub1 = Meteor.subscribe(Items.userPublicationName);
    return {
        // item: Items.collection.find({}).fetch(),
        ready: sub1.ready(),
    };
})(ListItem);

export default withRouter(ListItemContainer);
