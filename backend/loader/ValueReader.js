class ValueReader {

    constructor(resourceManager) {
        this.resources = resourceManager;
    }

    read(reference) {

        const worksheet =
            this.resources.worksheets.get(
                reference.spreadsheet,
                reference.worksheet
            );

        if (worksheet.getLastRow() === 0) {
            return [];
        }

        return worksheet
            .getRange(
                1,
                1,
                worksheet.getLastRow(),
                worksheet.getLastColumn()
            )
            .getValues();
    }

}