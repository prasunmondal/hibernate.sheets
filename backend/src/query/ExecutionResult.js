class ExecutionResult {

    constructor() {

        this.rows = [];

    }

    addRow(row) {

        this.rows.push(row);

    }

    getRows() {

        return this.rows;

    }

    getRowCount() {

        return this.rows.length;

    }

    isEmpty() {

        return this.rows.length === 0;

    }

}