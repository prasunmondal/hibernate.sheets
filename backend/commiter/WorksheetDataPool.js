class WorksheetDataPool {

    constructor() {

        this.cache = {};

    }

    get(spreadsheet, worksheet) {

        const key = spreadsheet + ":" + worksheet;

        if (!this.cache[key]) {

            this.cache[key] =
                new WorksheetDataReference(
                    spreadsheet,
                    worksheet
                );

        }

        return this.cache[key];

    }

}