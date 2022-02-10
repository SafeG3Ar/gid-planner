import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import _ from 'lodash';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../role/Role';
import BaseCollection from '../base/BaseCollection';

export const taskPublications = {
    task: 'Task',
    taskAdmin: 'taskAdmin',
};

class TaskCollection extends BaseCollection {
    constructor() {
        super('Tasks', new SimpleSchema({
            task: { type: String} ,
            listName: { type: Array },
            'listName.$': String,
            date: { type: Date, optional: true },
            notes: { type: String, optional: true },
            // tags: { type: String, optional: true },
            owner: { type: String },
        }));
    }

    define({ task, listName, date, notes, owner }) {
        const docID = this._collection.insert({
            task,
            listName,
            date,
            notes,
            owner,
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

    removeIt(name) {
        const doc = this.findDoc(name);
        check(doc, Object);
        this._collection.remove(doc._id);
        return true;
    }

    publish() {
        if (Meteor.isServer) {
            const instance = this;
            Meteor.publish(taskPublications.task, function publish() {
                if(this.userId) {
                    const username = Meteor.users.findOne(this.userId).username;
                    return instance._collection.find({ owner: username });
                }
                return this.ready();
            });

            Meteor.publish(taskPublications.taskAdmin, function publish() {
                if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
                    return instance._collection.find();
                }
                return this.ready();
            });
        }
    }

    subscribeTask() {
        if (Meteor.isClient) {
            return Meteor.subscribe(taskPublications.task);
        }
        return null;
    }

    subscribeTaskAdmin() {
        if (Meteor.isClient) {
            return Meteor.subscribe(taskPublications.taskAdmin);
        }
        return null;
    }

    assertValidRoleForMethod(userId) {
        this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
      }

}
export const Tasks = new TaskCollection();