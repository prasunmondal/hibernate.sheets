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

        const limit = compiledPlan.getLimit();
        const offset = compiledPlan.getOffset();

        let matchedCount = 0;
        let returnedCount = 0;

        for (let i = 0; i < rows.length; i++) {

            const row = rows[i];

            executionStats.rowsExamined++;

            if (!this.matches(context, row, predicates)) {
                continue;
            }

            executionStats.rowsMatched++;

            //
            // Skip rows until OFFSET is reached
            //
            if (matchedCount < offset) {
                matchedCount++;
                continue;
            }

            //
            // Return current row
            //
            result.addRow(row);

            matchedCount++;
            returnedCount++;

            //
            // Stop once LIMIT is reached
            //
            if (limit >= 0 && returnedCount >= limit) {
                break;
            }

        }

        return result;
    }

    // matches(context, row, predicates) {
    //
    //     context.getDebug().add("matches()", {
    //         predicatesIsNull: predicates == null,
    //         predicatesType: typeof predicates,
    //         isArray: Array.isArray(predicates),
    //         constructor: predicates ? predicates.constructor.name : null,
    //         rowIsNull: row == null,
    //         rowValuesIsNull: row ? row.values == null : true
    //     });
    //
    //     if (predicates == null) {
    //         throw new Error("predicates == null");
    //     }
    //
    //     if (!Array.isArray(predicates)) {
    //         throw new Error(
    //             "Predicates is not an array. Type=" +
    //             typeof predicates +
    //             ", constructor=" +
    //             predicates.constructor.name
    //         );
    //     }
    //
    //     for (let i = 0; i < predicates.length; i++) {
    //
    //         const predicate = predicates[i];
    //
    //         context.getDebug().add("Before Predicate", {
    //             index: i,
    //             predicate: predicate
    //         });
    //
    //         const actualValue = row.values[predicate.columnIndex];
    //         const matched = predicate.matches(row);
    //
    //         context.getDebug().add(
    //             "Predicate Evaluation",
    //             {
    //                 predicate: predicate.constructor.name,
    //                 columnIndex: predicate.columnIndex,
    //                 expectedValue: predicate.expectedValue,
    //                 actualValue: actualValue,
    //                 matched: matched
    //             }
    //         );
    //
    //         if (!matched) {
    //             return false;
    //         }
    //     }
    //
    //     return true;
    // }

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