class InsertExecutor {

    //
    // TODO
    // Validate required columns
    // Validate primary key
    // Apply default values
    // Apply formulas
    // Apply generated values
    //
    execute(context,
            worksheetData,
            compiledPlan) {

        const result =
            new ExecutionResult();

        const values =
            new Array(
                worksheetData.getColumnCount()
            ).fill("");

        const compiledValues =
            compiledPlan.getValues();

        for (const value of compiledValues) {

            values[value.columnIndex] =

                value.apply(
                    ""
                );

        }

        const row =
            new DataRow(
                -1,
                values
            );

        row.markNew();

        worksheetData.addRow(row);

        worksheetData
            .getChangeSet()
            .created
            .push(row);

        result.addRow(row);

        return result;

    }

}