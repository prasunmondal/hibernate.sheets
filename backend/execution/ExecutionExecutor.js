class ExecutionExecutor {

    execute(context,
            worksheetData,
            compiledPlan) {

        const result = new ExecutionResult();

        const executionStats = context.statistics.execution;

        const rows = worksheetData.getRows();
        const predicates = compiledPlan.getPredicates();

        if (!rows) {
            throw new Error("worksheetData.getRows() returned undefined");
        }

        if (!predicates) {
            throw new Error("compiledPlan.getPredicates() returned undefined");
        }

        for (let i = 0; i < rows.length; i++) {

            const row = rows[i];

            executionStats.rowsExamined++;

            if (!this.matches(context, row, predicates)) {
                continue;
            }

            executionStats.rowsMatched++;

            result.addRow(row);

        }

        return result;
    }

    matches(context, row, predicates) {

        if (predicates == null) {
            throw new Error("CompiledPlan returned null/undefined predicates.");
        }

        for (let i = 0; i < predicates.length; i++) {

            const predicate = predicates[i];

            context.getDebug().add(
                "Predicate Evaluation",
                {
                    predicate: predicate.constructor.name,
                    columnIndex: predicate.columnIndex,
                    expectedValue: predicate.expectedValue,
                    actualValue: row.values[predicate.columnIndex],
                    matched: predicate.matches(row)
                }
            );

            if (!predicate.matches(row)) {
                return false;
            }

        }

        return true;
    }
}