class WorksheetCommitter {

    commit(worksheetData,
           resources) {

        const worksheet =
            resources.worksheets.get(
                worksheetData.spreadsheet,
                worksheetData.worksheet
            );

        const changeSet =
            worksheetData.getChangeSet();

        if (changeSet.created.length === 0) {
            return;
        }

        // Build values...
        const values = [];

        for (const row of changeSet.created) {

            values.push(
                row.values
            );

        }

        // worksheet.getRange(...).setValues(...)
        const startRow =
            worksheet.getLastRow() + 1;

        worksheet
            .getRange(
                startRow,
                1,
                values.length,
                worksheetData.getColumnCount()
            )
            .setValues(values);

        // changeSet.clear()
        for (const row of changeSet.created) {

            row.state = RowState.CLEAN;

        }

        changeSet.clear();
    }

}