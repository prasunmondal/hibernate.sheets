class ExecutionResult {

    constructor() {

        this.rows = [];

        this.statistics = new ExecutionStatistics();

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

    getStatistics() {

        return this.statistics;

    }

    isEmpty() {

        return this.rows.length === 0;

    }
}