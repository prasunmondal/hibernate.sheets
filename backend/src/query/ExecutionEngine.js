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
            compiledPlan: compile.result,
            result: execute.result
        };

    }

}