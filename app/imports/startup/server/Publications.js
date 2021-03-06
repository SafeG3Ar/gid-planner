import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Tasks } from '../../api/task/TaskCollection';
import { Lists } from '../../api/list/ListCollection';
import { Tags } from '../../api/tag/TagCollection';
import { Profiles } from '../../api/profile/ProfileCollection';
import { ListItems } from '../../api/list/ListItemCollection';
import { Items } from '../../api/item/ItemCollection';

/** Publish Tasks Collection you need. */
// Tasks.publish();

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Tasks.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Tasks.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Lists.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Lists.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Items.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Items.collection.find({ owner: username });
    // const listIds = sortedItems.map(function(x) { return x.listId});
    // return [
    //   sortedItems,
    //   Lists.collection.find({ _id: { $in: listIds }})
    // ];
  }
  return this.ready();
});

Meteor.publish(ListItems.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return ListItems.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Tags.userPublicationName, function () {
  if (this.userId) {
    return Tags.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(Tasks.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Tasks.collection.find();
  }
  return this.ready();
});

Meteor.publish(Lists.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Lists.collection.find();
  }
  return this.ready();
});

Meteor.publish(Items.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Items.collection.find();
  }
  return this.ready();
});

Meteor.publish(ListItems.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return ListItems.collection.find();
  }
  return this.ready();
});

Meteor.publish(Profiles.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Profiles.collection.find();
  }
  return this.ready();
});

Meteor.publish(Tags.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Tags.collection.find();
  }
  return this.ready();
});
// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

// Maybe use if implement MATRP
/*
import { Meteor } from 'meteor/meteor';
import { MATRP } from '../../api/matrp/MATRP';

// Call publish for all the collections.
MATRP.collections.forEach(c => c.publish());

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
*/
