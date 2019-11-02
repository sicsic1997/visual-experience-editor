export class Change {

    static CHANGE_TYPES = {
        ADD: "add",
        EDIT: "edit",
        REMOVE: "remove",
        MOVE: "move"
    }

    constructor(change_type, position, properties = {}) {
        this._change_type = change_type;
        this._position = position;
        this._properties = properties;
    }

}