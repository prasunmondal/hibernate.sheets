class ExecutionExecutor {

    execute(context,
            worksheetData,
            compiledPlan) {

        const result = new ExecutionResult();

        const executionStats = context.statistics.execution;

        const rows = worksheetData.getRows();
        const predicates = compiledPlan.getPredicates();

        // ==========================================================
        // Debug
        // ==========================================================

        context.getDebug().add(
            "ExecutionExecutor",
            {
                rowsLoaded: rows.length,
                predicateCount: predicates.length
            }
        );

        for (let i = 0; i < rows.length; i++) {

            const row = rows[i];

            executionStats.rowsExamined++;

            context.getDebug().add(
                "Row",
                {
                    index: i,
                    values: row.values
                }
            );

            const matched = this.matches(context, row, predicates);

            context.getDebug().add(
                "Row Result",
                {
                    index: i,
                    matched: matched
                }
            );

            if (matched) {

                executionStats.rowsMatched++;

                result.addRow(row);
            }
        }

        context.getDebug().add(
            "Execution Summary",
            {
                rowsExamined: executionStats.rowsExamined,
                rowsMatched: executionStats.rowsMatched
            }
        );

        return result;
    }

    matches(context, row, predicates) {

        for (let i = 0; i < predicates.length; i++) {

            const predicate = predicates[i];

            const matched = predicate.matches(row);

            context.getDebug().add(
                "Predicate Evaluation",
                {
                    predicate: predicate.constructor.name,
                    columnIndex: predicate.columnIndex,
                    expectedValue: predicate.expectedValue,
                    actualValue: row.values[predicate.columnIndex],
                    matched: matched
                }
            );

            if (!matched) {
                return false;
            }

        }

        return true;
    }

}