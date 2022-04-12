import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The TaskCollection. It encapsulates state and variable values for stuff.
 */
class TaskCollection {
  constructor() {
    // The name of this collection.
    this.name = 'TaskCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      task: { type: String },
      listName: { type: Array, optional: true },
      'listName.$': String,
      dueDate: { type: String, optional: true },
      note: { type: String, optional: true },
      tags: { type: Array, optional: true },
      'tags.$': String,
      owner: { type: String },
      // task: String,
      // listName: Array,
      // 'listName.$': String,
      // dueDate: {
      //   type: String,
      //   optional: true,
      // },
      // tags: Array,
      // 'tags.$': String,
      // owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {TaskCollection}
 */
export const Tasks = new TaskCollection();
