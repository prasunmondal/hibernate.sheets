class ExecutionExecutor {

    execute(context,
            worksheetData,
            compiledPlan) {

        const result = new ExecutionResult();

        const executionStats = context.statistics.execution;

        const rows = worksheetData.getRows();
        const predicates = compiledPlan.getPredicates();

        for (let i = 0; i < rows.length; i++) {

            const row = rows[i];

            executionStats.rowsExamined++;

            if (this.matches(row, predicates)) {

                executionStats.rowsMatched++;

                result.addRow(row);
            }
        }

        return result;
    }

    matches(row, predicates) {

        for (let i = 0; i < predicates.length; i++) {

            if (!predicates[i].matches(row)) {
                return false;
            }

        }

        return true;
    }

}