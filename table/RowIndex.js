class RowIndex {

    constructor(primaryKeyIndex) {

        this.primaryKeyIndex = primaryKeyIndex;

        this.rows = new Map();

    }

    put(row) {

        const key = row.get(this.primaryKeyIndex);

        this.rows.set(key, row);

    }

    get(key) {

        return this.rows.get(key);

    }

    contains(key) {

        return this.rows.has(key);

    }

    remove(key) {

        this.rows.delete(key);

    }

}