import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Items } from '../../api/item/ItemCollection';
import { _ } from 'meteor/underscore';

const addItemMethod = 'items.add';
Meteor.methods({
    'items.add'({ item }) {
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

export { addItemMethod, removeItemMethod, setCheckedMethod };

