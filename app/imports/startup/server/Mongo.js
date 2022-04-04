import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Profiles } from '../../api/profile/ProfileCollection.js';
import { Tags } from '../../api/tag/TagCollection.js';
import { Lists } from '../../api/list/ListCollection.js';
import { Tasks } from '../../api/task/TaskCollection.js';
import { Items } from '../../api/item/ItemCollection.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addLists(data) {
  console.log(`  Adding: (${data.owner}) list`);
  Lists.collection.insert({ name: data.name, owner: data.owner });
}

// function addItems(data) {
//   console.log(`  Adding: (${data.owner}) item`);
//   Lists.collection.allow.insert({ item: data.item, listId: data.listId, checked: data.checked, createdAt: data.createdAt, owner: data.owner });
// }

function addProfiles(data) {
  console.log(`  Adding:(${data.owner}) profile`);
  Profiles.collection.insert(data);
}

function addTags(data) {
  console.log(`  Adding: (${data.tagName}) tag`);
  Tags.collection.insert(data);
}

function addTasks(data) {
  console.log(`  Adding: tasks for (${data.owner})`);
  Tasks.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

if (Lists.collection.find().count() === 0) {
  if (Meteor.settings.defaultLists) {
    console.log('Creating default lists.');
    Meteor.settings.defaultLists.map(data => addLists(data));
  }
}

if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.map(data => addProfiles(data));
  }
}

if (Tags.collection.find().count() === 0) {
  if (Meteor.settings.defaultTags) {
    console.log('Creating default tags.');
    Meteor.settings.defaultTags.map(data => addTags(data));
  }
}

if (Tasks.collection.find().count() === 0) {
  if (Meteor.settings.defaultTasks) {
    console.log('Creating default tasks.');
    Meteor.settings.defaultTasks.map(data => addTasks(data));
  }
}

// if (Items.collection.find().count() === 0) {
//   if (Meteor.settings.defaultItems) {
//     console.log('Creating default items.');
//     Meteor.settings.defaultItems.map(data => addItems(data));
//   }
// }
