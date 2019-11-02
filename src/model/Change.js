export class Change {

    // serialize: JSON.stringify()
    // deserialize: JSON.parse()


    static CHANGE_TYPES = {
        ADD: 0,
        EDIT: 1,
        REMOVE: 2
    }

    constructor(change_type, position, properties = {}) {
        this._change_type = change_type;
        this._position = position;
        this._properties = properties;
    }

}