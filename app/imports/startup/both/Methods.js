import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Items } from '../../api/item/ItemCollection';
import { Lists } from '../../api/list/ListCollection';
import { ListItems } from '../../api/list/ListItemCollection';

const addItemMethod = 'items.add';
Meteor.methods({
    'items.add'({ item, listId, checked, createdAt, owner }) {
        Items.collection.insert({
            item,
            listId,
            checked,
            createdAt,
            owner,
        });
    },
});

const removeItemMethod = 'items.remove';
Meteor.methods({
    'items.remove'(itemId) {
        Items.collection.remove({ itemId });
    },
});

const setCheckedMethod = 'items.setChecked';
Meteor.methods({
    'items.setChecked'({ itemId, setChecked }) {
        check(itemId, String);
        check(setChecked, Boolean);
        Items.update(
            itemId, { $set: { checked: setChecked } });
    },
});

const addListMethod = 'list.add';
Meteor.methods({
    'list.add'({ name, owner }) {
        return Lists.collection.insert({
            name,
            owner,
        });
    },
});

const updateListMethod = 'list.update';
Meteor.methods({
    'list.update'({ _id, name, owner }) {
        Lists.collection.update(_id, { $set: {
            name,
            owner,
        }});
    },
});

export { addItemMethod, removeItemMethod, setCheckedMethod, addListMethod, updateListMethod };

