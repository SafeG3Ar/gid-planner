import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Tasks } from '../../api/task/TaskCollection';
import { Items } from '../../api/item/ItemCollection';
import { Lists } from '../../api/list/ListCollection';

/** Methods to call from the client*/

const addTaskMethod = 'tasks.add';
Meteor.methods({
  'tasks.add'({ task, listName, dueDate, note, tags, owner }) {
    Tasks.collection.insert({
      task,
      listName,
      dueDate,
      note,
      tags,
      owner,
    });
  },
});

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
    const item = Items.collection.findOne(itemId);
    if (item.owner && item.owner !== Meteor.user().username) {
      throw new Meteor.Error('not-authorized');
    }
    Items.collection.remove({ itemId });
  },
});

const setCheckedMethod = 'items.setChecked';
Meteor.methods({
  'items.setChecked'({ itemId, setChecked }) {
    check(itemId, String);
    check(setChecked, Boolean);
    Items.collection.update(
      itemId, { $set: { checked: setChecked } },
    );
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
    } });
  },
});

export { addTaskMethod, addItemMethod, removeItemMethod, setCheckedMethod, addListMethod, updateListMethod };
