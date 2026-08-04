class ResourceManager {

    constructor(registry) {

        this.spreadsheets =
            new SpreadsheetPool(registry);

        this.worksheets =
            new WorksheetPool(this.spreadsheets);

        this.headers =
            new HeaderPool(this.worksheets);

        this.data =
            new WorksheetDataPool();

    }

}