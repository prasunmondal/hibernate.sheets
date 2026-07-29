class DebugContext {

    constructor() {
        this.entries = [];
    }

    add(key, value) {
        this.entries.push({
            key: key,
            value: value
        });
    }

    getEntries() {
        return this.entries;
    }

}