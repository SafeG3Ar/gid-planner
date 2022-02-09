import SimpleSchema from "simpl-schema";
import BaseCollection from "../base/BaseCollection";

class TagCollection extends BaseCollection {
    constructor() {
        super('Tags', new SimpleSchema({
            name: { type: String },
        }));
    }

    define({
        name,
    }) {
        const tagID = this._collection.insert({
            name,
        });

    }

    update(docID, {
        name,
    }) {
        this.assertDefined(docID);
        const updateData = {};
        if (name) {
            updateData.name = name;
        }
        this._collection.update(docID, { $set: updateData });
    }

    removeIt(instance) {
        const docID = this.getID(instance);
        super.removeIt(docID);
    }

    dumpOne(docID) {
        const doc = this.findDoc(docID);
        const {name } = doc;
        return { name };
    }

}
export const Tags = new TagCollection();