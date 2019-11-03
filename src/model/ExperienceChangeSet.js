export default class ExperienceChangeSet {

    constructor(metadata = {}, changes_list = []) {
        this._metadata = metadata;
        this._changes_list = changes_list;
    }

    addChange(change) {
        this._changes_list.addChange(change)
    }

}