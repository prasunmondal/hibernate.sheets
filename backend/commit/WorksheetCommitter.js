class WorksheetCommitter {

    commit(worksheetData, resources) {

        const worksheet =
            resources.worksheets.get(
                worksheetData.spreadsheet,
                worksheetData.worksheet
            );

        const changeSet =
            worksheetData.getChangeSet();

        this.commitCreated(
            worksheet,
            worksheetData,
            changeSet.created
        );

        this.commitUpdated(
            worksheet,
            worksheetData,
            changeSet.updated
        );

        this.commitDeleted(
            worksheet,
            worksheetData,
            changeSet.deleted
        );

        changeSet.clear();

    }

    commitCreated(worksheet,
                  worksheetData,
                  rows) {

        if (!rows || rows.length === 0) {
            return;
        }

        const values = [];

        for (const row of rows) {
            values.push(row.values);
        }

        const startRow =
            worksheet.getLastRow() + 1;

        worksheet
            .getRange(
                startRow,
                1,
                values.length,
                worksheetData
                    .getSchema()
                    .getColumns()
                    .length
            )
            .setValues(values);

        for (let i = 0; i < rows.length; i++) {
            rows[i].sheetRow = startRow + i;
        }

    }

    commitUpdated(worksheet,
                  worksheetData,
                  rows) {

        if (rows.length === 0) {
            return;
        }

        const columnCount =
            worksheetData.getSchema()
                .getColumns()
                .length;

        for (const row of rows) {

            worksheet
                .getRange(
                    row.sheetRow,
                    1,
                    1,
                    columnCount
                )
                .setValues([
                    row.values
                ]);

        }

    }

    commitDeleted(worksheet,
                  worksheetData,
                  rows) {

        if (!rows || rows.length === 0) {
            return;
        }

        //
        // Delete from bottom to top
        //
        rows.sort(function (a, b) {
            return b.sheetRow - a.sheetRow;
        });

        for (const row of rows) {
            worksheet.deleteRow(
                row.sheetRow
            );
        }

    }

}