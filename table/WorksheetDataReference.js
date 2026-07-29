class WorksheetDataReference {

    constructor(spreadsheet, worksheet) {

        this.spreadsheet = spreadsheet;

        this.worksheet = worksheet;

        this.data = null;

    }

    isLoaded() {
        return this.data !== null;
    }

}