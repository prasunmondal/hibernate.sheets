class HeaderPool {

    constructor(worksheetPool){

        this.pool = worksheetPool;

        this.cache = {};

    }

    get(spreadsheet, worksheet){

        const key =
            spreadsheet+":"+worksheet;

        if(this.cache[key])

            return this.cache[key];

        const ws =
            this.pool.get(spreadsheet,worksheet);

        const headers =
            ws.getRange(
                1,
                1,
                1,
                ws.getLastColumn())
            .getValues()[0];

        this.cache[key]=headers;

        return headers;

    }

}