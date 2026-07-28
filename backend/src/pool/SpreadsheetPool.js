class SpreadsheetPool {

    constructor(registry){

        this.registry = registry;

        this.cache = {};

    }

    get(alias){

        if(this.cache[alias])

            return this.cache[alias];

        const id =
            this.registry.getSpreadsheetId(alias);

        const spreadsheet =
            SpreadsheetApp.openById(id);

        this.cache[alias] = spreadsheet;

        return spreadsheet;

    }

}