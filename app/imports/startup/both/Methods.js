// import { Meteor } from 'meteor/meteor';
// import { Items } from '../../api/item/ItemCollection';
// import { check } from 'meteor/check';
// import { _ } from 'meteor/underscore';

// const addItemMethod = 'Items.add';
// const removeItemMethod = 'Items.remove';
// const setCheckedMethod = 'Items.setChecked';

// Meteor.methods({
//     'items.add'({ item }) {
//         Items.collection.insert({
//             item,
//             checked,
//             listId,
//             createdAt: new Date(),
//             owner: Meteor.user().findOne(this.userId).username,
//         });
//     },
//     'items.remove'(itemId) {
//         Items.collection.remove({ itemId });
//     },
//     'items.setChecked'({ itemId, setChecked }) {
//         check(itemId, String);
//         check(setChecked, Boolean);
//         Items.update(
//             itemId, { $set: { checked: setChecked } });
//     },

// });




// export { addItemMethod, removeItemMethod, setCheckedMethod };

