import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { Tasks } from './TaskCollection';

/**
 * Meteor method used to define new instances of the given collection name.
 * @param collectionName the name of the collection.
 * @param definitionDate the object used in the collection.define method.
 * @memberOf api/base
 */
export const taskDefineMethod = new ValidatedMethod({
  name: 'TaskCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    // console.log('taskDefineMethod', definitionData);
    if (Meteor.isServer) {
      const docID = Tasks.define(definitionData);
      // console.log(`taskDefineMethod returning ${docID}. Now have ${Tasks.count()}`);
      return docID;
    }
    return '';
  },
});

export const taskUpdateMethod = new ValidatedMethod({
  name: 'TaskCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    Tasks.update(updateData.id, updateData);
    return true;
  },
});

export const taskRemoveItMethod = new ValidatedMethod({
  name: 'TaskCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return Tasks.removeIt(instance);
  },
});
