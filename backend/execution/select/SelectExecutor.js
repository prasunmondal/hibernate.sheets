class SelectExecutor {

    constructor() {

        this.executor =
            new ExecutionExecutor();

        this.sorter =
            new ExecutionSorter();

        this.paginator =
            new ExecutionPaginator();

    }

    execute(context,
            worksheetData,
            compiledPlan) {

        const executionStats =
            context.statistics.execution;

        const execute =
            Stopwatch.measure(() => {

                const result =
                    this.executor.execute(
                        context,
                        worksheetData,
                        compiledPlan
                    );

                this.sorter.sort(
                    result,
                    compiledPlan
                );

                this.paginator.paginate(
                    result,
                    compiledPlan
                );

                return result;

            });

        executionStats.executeTime =
            execute.elapsed;

        executionStats.totalTime =
            executionStats.compileTime +
            executionStats.executeTime;

        return execute.result;

    }

}