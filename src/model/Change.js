class Change {

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

    static serializeChange(change) {
        return JSON.stringify(change);
    }

    static deserializeChange(serializedChange) {
        var obj = JSON.parse(serializedChange);
        return new Change(obj._change_type, obj._position, obj._properties);
    }

}