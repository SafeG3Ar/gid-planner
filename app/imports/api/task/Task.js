import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

// export const allowedTags = ['Important', 'Critical'....
export const taskPublications = {
  task: 'Task',
  taskAdmin: 'TaskAdmin',
};

class TaskCollection extends BaseCollection {
  constructor() {
    super('Tasks', new SimpleSchema({
      task: String,
      listName: Array,
      'listName.$': String,
      /*
      tags: {
        type: String,
        allowedValues: allowedTags,
      },
      */
      date: {
        type: String,
        optional: true,
      },
      notes: {
        type: String,
        optional: true,
      },
    }));
  }

  /**
   * Defines a new Task.
   * @return {String} the docID of the new document.
   */
  define({ task, listName, date, notes }) {
    const docID = this._collection.insert({
      task, listName, date, notes,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param data the unfiltered updateData object.
   */
  update(docID, data) {
    const updateData = {};

    function addString(name) {
      if (data[name]) { // if not undefined or empty String
        updateData[name] = data[name];
      }
    }

    addString('task');
    // check if listName is not undefined && every list type is not undefined
    if (data.listName && data.listName.every(elem => elem)) {
      updateData.listName = data.listName;
    }
    addString('date');
    addString('notes');
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and to users.
   */
  publish() {
    if (Meteor.isServer) {
      // get the TaskCollection instance.
      const instance = this;
      Meteor.publish(taskPublications.task, function publish() {
        if (this.userId) {
          // const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find();
        }
        return this.ready();
      });

      Meteor.publish(taskPublications.taskAdmin, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for users.
   */
  subscribeTask() {
    if (Meteor.isClient) {
      return Meteor.subscribe(taskPublications.task);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeTaskAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(taskPublications.taskAdmin);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Tasks = new TaskCollection();
