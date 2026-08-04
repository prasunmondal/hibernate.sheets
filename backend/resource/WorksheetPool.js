class WorksheetPool {

    constructor(spreadsheetPool){

        this.pool = spreadsheetPool;

        this.cache = {};

    }

    get(spreadsheetAlias, worksheet){

        const key =
            spreadsheetAlias + ":" + worksheet;

        if(this.cache[key])

            return this.cache[key];

        const ss =
            this.pool.get(spreadsheetAlias);

        const ws = ss.getSheetByName(worksheet);

        if (!ws) {
            throw new Error(
                "Worksheet not found: " +
                worksheet
            );
        }

        this.cache[key] = ws;

        return ws;
    }

}