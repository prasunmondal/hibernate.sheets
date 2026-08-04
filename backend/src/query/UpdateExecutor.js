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

        const predicates =
            compiledPlan.getPredicates();

        const values =
            compiledPlan.getValues();

        const rows =
            worksheetData.getRows();

        for (const row of rows) {

            if (!this.executor.matches(
                context,
                row,
                predicates
            )) {

                continue;

            }

            for (const value of values) {

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