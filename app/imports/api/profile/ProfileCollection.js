import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const profilePublications = {
  profile: 'Profile',
  profileAdmin: 'ProfileAdmin',
};

class ProfileCollection extends BaseCollection {
  constructor() {
    super('Profile', new SimpleSchema({
      email: String,
      firstName: String,
      lastName: String,
      phone: String,
      twoFactor: {
        optional: true,
        type: String,
        allowedValues: ['Yes', 'No'],
      },
      owner: String,
    }));
  }

  /**
   * Defines a new List Name.
   * @param email.
   * @param firstName.
   * @param lastName.
   * @param phone.
   * @param twoFactor.
   * @param owner.
   * @return {String} the docID of the new document.
   */
  define({ email, firstName, lastName, phone, twoFactor, owner }) {
    const docID = this._collection.insert({
      email,
      firstName,
      lastName,
      phone,
      twoFactor,
      owner,

    });
    return docID;
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
   * It publishes the entire collection for admin and just the listName associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the ListNameCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(profilePublications.profile, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(profilePublications.profileAdmin, function publish() {
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
  subscribeProfile() {
    if (Meteor.isClient) {
      return Meteor.subscribe(profilePublications.profile);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeProfileAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(profilePublications.profileAdmin);
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
export const Profiles = new ProfileCollection();
