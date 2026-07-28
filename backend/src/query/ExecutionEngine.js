class ExecutionEngine {

    constructor(compiler,
                executor) {

        this.compiler =
            compiler || new ExecutionCompiler();

        this.executor =
            executor || new ExecutionExecutor();

    }

    execute(context,
            worksheetData,
            executionPlan) {

        const executionStats =
            context.statistics.execution;

        const stopwatch = new Stopwatch();

        stopwatch.start();

        const compiledPlan =
            this.compiler.compile(
                worksheetData,
                executionPlan
            );

        executionStats.compileTime =
            stopwatch.elapsed();

        stopwatch.restart();

        const result =
            this.executor.execute(
                context,
                worksheetData,
                compiledPlan
            );

        executionStats.executeTime =
            stopwatch.elapsed();

        executionStats.totalTime =
            executionStats.compileTime +
            executionStats.executeTime;

        return result;

    }

}