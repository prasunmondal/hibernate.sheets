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

        for (const row of matchingRows.getRows()) {

            row.markDeleted();

            worksheetData
                .getChangeSet()
                .deleted
                .push(row);

            result.addRow(row);
        }

        result.deleted =
            result.getRowCount();

        return result;

    }

}