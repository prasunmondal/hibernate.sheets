class GoogleSheetsProvider {

    constructor(resources) {

        this.resources = resources;

        this.loader =
            new WorksheetLoader(resources);

        this.committer =
            new WorksheetCommitter();

    }

    getWorksheetData(context,
                     spreadsheet,
                     worksheet) {

        const reference =
            this.resources.data.get(
                spreadsheet,
                worksheet
            );

        if (!reference.isLoaded()) {

            this.loader.load(
                context,
                reference
            );

        }

        return reference.data;

    }

    commit(worksheetData) {

        this.committer.commit(
            worksheetData
        );

    }

}