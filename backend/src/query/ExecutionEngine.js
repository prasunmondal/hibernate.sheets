class ExecutionEngine {

    constructor(compiler, executor) {

        this.compiler =
            compiler ?? new ExecutionCompiler();

        this.executor =
            executor ?? new ExecutionExecutor();

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

                return this.executor.execute(
                    context,
                    worksheetData,
                    compile.result
                );

            });

        executionStats.executeTime =
            execute.elapsed;

        executionStats.totalTime =
            executionStats.compileTime +
            executionStats.executeTime;

        return execute.result;

    }

}