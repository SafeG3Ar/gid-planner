import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Profiles } from '../../api/profile/ProfileCollection.js';
import { Tags } from '../../api/tag/TagCollection.js';
import { Tasks } from '../../api/task/TaskCollection.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

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
