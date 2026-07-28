class Registry {

    constructor() {

        this.spreadsheets = {

            MASTER: "",

            HR: "",

            SALES: "",

            CONFIG: ""

        };

    }

    getSpreadsheetId(alias) {

        const id = this.spreadsheets[alias];

        if (!id) {

            throw new Error("Unknown spreadsheet : " + alias);

        }

        return id;

    }

}