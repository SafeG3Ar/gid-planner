import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Items } from '../../api/item/ItemCollection';
import { Lists } from '../../api/list/ListCollection';

const addItemMethod = 'items.add';
Meteor.methods({
    'items.add'({ item, checked, listId }) {
        Items.collection.insert({
            item,
            checked,
            listId,
            createdAt: new Date(),
            owner: Meteor.user().findOne(this.userId).username,
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

const updateListMethod = 'list.update';
Meteor.methods({
    'list.update'({ name, _id }) {
        Lists.collection.update(_id, { $set: {
            name,
            owner: Meteor.user().username,
        }}, { upsert: true });
    },
});

export { addItemMethod, removeItemMethod, setCheckedMethod, updateListMethod };

