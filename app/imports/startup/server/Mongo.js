import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Profiles } from '../../api/profile/ProfileCollection';
import { Tags } from '../../api/tag/TagCollection';
import { ListNames } from '../../api/listName/ListName';
import { Tasks } from '../../api/task/TaskCollection';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addLists(data) {
  console.log(`  Adding: (${data.owner}) list`);
  ListNames.define(data);
}

function addProfiles(data) {
  console.log(`  Adding:(${data.owner}) profile`);
  Profiles.define(data);
}

function addTags(data) {
  console.log(`  Adding: (${data.tagName}) tag`);
  Tags.define(data);
}

function addTasks(data) {
  console.log(`  Adding: tasks for (${data.owner})`);
  Tasks.define(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

if (ListNames.count() === 0) {
  if (Meteor.settings.defaultLists) {
    console.log('Creating default lists.');
    Meteor.settings.defaultLists.map(data => addLists(data));
  }
}

if (Profiles.count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.map(data => addProfiles(data));
  }
}

if (Tags.count() === 0) {
  if (Meteor.settings.defaultTags) {
    console.log('Creating default tags.');
    Meteor.settings.defaultTags.map(data => addTags(data));
  }
}

if (Tasks.count() === 0) {
  if (Meteor.settings.defaultTasks) {
    console.log('Creating default tasks.');
    Meteor.settings.defaultTasks.map(data => addTasks(data));
  }
}
