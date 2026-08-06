class UpdateExecutor {

    constructor() {

        this.executor =
            new ExecutionExecutor();

    }

    execute(context,
            worksheetData,
            compiledPlan) {

        const result =
            new ExecutionResult();

        const matchingRows =
            this.executor.execute(
                context,
                worksheetData,
                compiledPlan
            );

        for (const row of matchingRows.getRows()) {

            for (const value of compiledPlan.getValues()) {

                row.set(
                    value.columnIndex,
                    value.value
                );

            }

            worksheetData
                .getChangeSet()
                .updated
                .push(row);

            result.addRow(row);
        }

        return result;

    }

}