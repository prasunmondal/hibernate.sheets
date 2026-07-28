class WorksheetSchema {

    constructor() {

        this.columns = [];

        this.columnLookup = {};

        this.primaryKeyIndex = -1;

        this.version = 1;

    }

    addColumn(column) {

        this.columns.push(column);

        this.columnLookup[column.name] = column.index;

        if (column.primaryKey) {
            this.primaryKeyIndex = column.index;
        }

    }

    indexOf(columnName) {

        return this.columnLookup[columnName];

    }

    hasColumn(columnName) {

        return this.columnLookup.hasOwnProperty(columnName);

    }

}