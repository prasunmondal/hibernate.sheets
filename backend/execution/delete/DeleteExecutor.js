class DeleteExecutor {

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

        const rows =
            worksheetData.getRows();

        for (let i = 0; i < rows.length; i++) {

            const row =
                rows[i];

            //
            // Apply WHERE
            //
            if (!this.executor.matches(
                context,
                row,
                predicates
            )) {

                continue;

            }

            //
            // Mark as deleted
            //
            row.markDeleted();

            //
            // Track change
            //
            worksheetData
                .getChangeSet()
                .deleted
                .push(row);

            //
            // Return deleted row
            //
            result.addRow(row);

        }

        result.deleted =
            result.getRowCount();

        return result;

    }

}