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
            title: { type: String} ,
            date: { type: Date },
            time: { type: String },
            description: { type: String, optional: true },
            tags: { type: String, optional: true },
            owner: { type: String },
        }));
    }

    define({ title, date, time, description, tags, owner }) {
        const docID = this._collection.insert({
            title,
            date,
            time,
            description,
            tags,
            owner,
        });
        return docID;
    }

    update(docID, { title, date, time, description, tags }) {
        const updateData = {};
        if (title) {
            updateData.title = title;
        }
        if (date) {
            updateData.date = date;
        }
        if (time) {
            updateData.time = time;
        }
        if (description) {
            updateData.description = description;
        }
        if (tags) {
            updateData.tags = tags;
        }
        this._collection.update(docID, { $set: updateData });
    }

    removeIt(name) {
        //super.removeIt(docID);
        const doc = this.findDoc(name);
        check(doc, Object);
        this._collection.remove(doc._id);
        return true;
    }

    dumpOne(docID) {
        const doc = this.findDoc(docID);
        const { title, date, time, description, tags, owner } = doc;
        return { title, date, time, description, tags, owner };
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

}
export const Tasks = new TaskCollection();