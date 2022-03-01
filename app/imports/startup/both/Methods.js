import { Meteor } from 'meteor/meteor';
import { Lists } from '../../api/list/ListCollection';
import { Tasks } from '../../api/task/TaskCollection';
import { TaskLists } from '../../api/task/TaskListCollection';
import { Items } from '../../api/item/ItemCollection';
import { ListItems } from '../../api/list/ListItemCollection';


const addListMethod = 'Lists.add';
/** Creates a new project in the Projects collection, and also updates ProfilesProjects and ProjectsInterests. */
Meteor.methods({
    'Lists.add'({ name, type, items, owner }) {
        Lists.collection.insert({ name, type, items, owner });
        ListItems.collection.remove({ item: name });
        if (items) {
            items.map((item) => ListItems.collection.insert({ list: name, item }));
        } else {
            throw new Meteor.Error('At least one item is required.');
        }
    },
});

const addItemMethod = 'Items.add';
/** Creates a new project in the Projects collection, and also updates ProfilesProjects and ProjectsInterests. */
Meteor.methods({
    'Items.add'({ name }) {
        Items.collection.insert({ name: name });
    },
});

export { addListMethod, addItemMethod };

