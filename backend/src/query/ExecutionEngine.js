class ExecutionEngine {

    constructor(compiler, executor) {

        this.compiler =
            compiler ?? new ExecutionCompiler();

        this.executor =
            executor ?? new ExecutionExecutor();

        this.executionSorter =
            new ExecutionSorter();

        this.paginator =
            new ExecutionPaginator();

    }

    execute(context,
            worksheetData,
            executionPlan) {

        switch (executionPlan.getType()) {

            case OperationType.SELECT:
                return this.executeSelect(
                    context,
                    worksheetData,
                    executionPlan
                );

            case OperationType.INSERT:
                return this.executeInsert(
                    context,
                    worksheetData,
                    executionPlan
                );

            case OperationType.UPDATE:
                return this.executeUpdate(
                    context,
                    worksheetData,
                    executionPlan
                );

            case OperationType.DELETE:
                return this.executeDelete(
                    context,
                    worksheetData,
                    executionPlan
                );

            case OperationType.UPSERT:
                return this.executeUpsert(
                    context,
                    worksheetData,
                    executionPlan
                );

            default:

                throw new Error(
                    "Unsupported operation type: " +
                    executionPlan.getType()
                );

        }

    }

    executeSelect(context,
                  worksheetData,
                  executionPlan) {

        const executionStats =
            context.statistics.execution;

        //
        // Compile
        //
        const compile =
            Stopwatch.measure(() => {

                return this.compiler.compile(
                    context,
                    worksheetData,
                    executionPlan
                );

            });

        executionStats.compileTime =
            compile.elapsed;

        //
        // Execute
        //
        const execute =
            Stopwatch.measure(() => {

                const result =
                    this.executor.execute(
                        context,
                        worksheetData,
                        compile.result
                    );

                this.executionSorter.sort(
                    result,
                    compile.result
                );

                this.paginator.paginate(
                    result,
                    compile.result
                );

                return result;

            });

        executionStats.executeTime =
            execute.elapsed;

        executionStats.totalTime =
            executionStats.compileTime +
            executionStats.executeTime;

        return {

            compiledPlan:
            compile.result,

            result:
            execute.result

        };

    }



    //
    // TODO
    // Validate required columns
    // Validate primary key
    // Apply default values
    // Apply formulas
    // Apply generated values
    //
    executeInsert(context,
                  worksheetData,
                  executionPlan) {

        //
        // Compile
        //
        const compile =
            this.compiler.compile(
                context,
                worksheetData,
                executionPlan
            );

        const compiledPlan =
            compile;

        const result =
            new ExecutionResult();

        //
        // Allocate row
        //
        const values =
            new Array(
                worksheetData.getColumnCount()
            );

        //
        // Apply compiled values
        //
        const compiledValues =
            compiledPlan.getValues();

        for (let i = 0; i < compiledValues.length; i++) {

            const value =
                compiledValues[i];

            values[value.columnIndex] =
                value.value;

        }

        //
        // Create row
        //
        const row =
            new DataRow(
                -1,
                values
            );

        row.markNew();

        //
        // Add to worksheet
        //
        worksheetData.addRow(row);

        //
        // Track changes
        //
        worksheetData
            .getChangeSet()
            .created
            .push(row);

        //
        // Return inserted row
        //
        result.addRow(row);

        return {
            compiledPlan: compiledPlan,
            result: result
        };

    }

    executeUpdate(context,
                  worksheetData,
                  executionPlan) {

        throw new Error(
            "UPDATE is not implemented."
        );

    }

    executeDelete(context,
                  worksheetData,
                  executionPlan) {

        throw new Error(
            "DELETE is not implemented."
        );

    }

    executeUpsert(context,
                  worksheetData,
                  executionPlan) {

        throw new Error(
            "UPSERT is not implemented."
        );

    }

}