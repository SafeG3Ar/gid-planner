import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import _ from 'lodash';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const tagPublications = {
    tag: 'Tag',
    tagAdmin: 'TagAdmin',
};

class TagCollection extends BaseCollection {
    constructor() {
        super('Tags', new SimpleSchema({
            tagName: { type: String },
        }));
    }

    /**
 * Defines a new Tag Name.
 * @param tagName.
 * @return {String} the docID of the new document.
 */
    define({ tagName }) {
        const docID = this._collection.insert({
            tagName,
        });
        return docID;
    }

    /**
 * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
 * @param { String | Object } name A document or docID in this collection.
 * @returns true
 */
    removeIt(instance) {
        const doc = this.findDoc(instance);
        check(doc, Object);
        this._collection.remove(doc._id);
        return true;
    }

    dumpOne(docID) {
        const doc = this.findDoc(docID);
        const { name } = doc;
        return { name };
    }

    /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the listName associated to an owner.
   */
    publish() {
        if (Meteor.isServer) {
            // get the ListNameCollection instance.
            const instance = this;
            /** This subscription publishes only the documents associated with the logged in user */
            Meteor.publish(tagPublications.tag, function publish() {
                if (this.userId) {
                    return instance._collection.find();
                }
                return this.ready();
            });

            /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
            Meteor.publish(tagPublications.tagAdmin, function publish() {
                if (this.userId) {
                    return instance._collection.find();
                }
                return this.ready();
            });
        }
    }

    /**
     * Subscription method for list name owned by the current user.
     */
    subscribeTag() {
        if (Meteor.isClient) {
            return Meteor.subscribe(tagPublications.tag);
        }
        return null;
    }

    /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
    subscribeTagAdmin() {
        if (Meteor.isClient) {
            return Meteor.subscribe(tagPublications.tagAdmin);
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

export const Tags = new TagCollection();