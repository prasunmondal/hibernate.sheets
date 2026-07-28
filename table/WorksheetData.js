class WorksheetData {

    constructor(spreadsheet, worksheet) {

        this.spreadsheet = spreadsheet;

        this.worksheet = worksheet;

        this.schema = new WorksheetSchema();

        this.rows = [];

        this.rowLookup = new Map();

        this.indexes = [];

        this.changeSet = new ChangeSet();

        this.loaded = false;

    }

    addRow(row) {

        this.rows.push(row);

        this.rowLookup.set(row.sheetRow, row);

    }

}