import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ItemCollection. It encapsulates state and variable values for stuff.
 */
class ItemCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ItemCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      item: { type: String, optional: true },
      listId: { type: String, optional: true },
      checked: { type: Boolean, defaultValue: false, optional: true },
      createdAt: { type: Date, optional: true },
      owner: { type: String },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ItemCollection.
 * @type {ItemCollection}
 */
export const Items = new ItemCollection();
