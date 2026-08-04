class ExecutionService {

    constructor() {

        this.engine =
            new ExecutionEngine();

        this.planBuilder =
            new ExecutionPlanBuilder();

        this.resultMapper =
            new ResultMapper();
    }

    execute(context) {

        for (const operation of context.request.getOperations()) {

            this.executeOperation(
                context,
                operation
            );

            context.provider.commitAll();
        }

    }

    executeOperation(context, operation) {

        const worksheetData =
            context.provider.getWorksheetData(
                context,
                operation.spreadsheet,
                operation.worksheet
            );

        const plan =
            this.planBuilder.build(
                context, operation
            );

        const execution =
            this.engine.execute(
                context,
                worksheetData,
                plan
            );

        const apiResult =
            this.resultMapper.map(
                execution.compiledPlan,
                execution.result,
                worksheetData
            );

        //////////////// Debug
        context.response.debug = context.getDebug().getEntries();

        context.response.addResult(
            apiResult
        );

        context.getDebug().add(
            "Worksheet",
            worksheetData.worksheet
        );

        context.getDebug().add(
            "Rows Loaded",
            worksheetData.getRows().length
        );

        context.getDebug().add(
            "Schema",
            worksheetData.getSchema()
        );

        context.getDebug().add(
            "Predicates",
            plan.getPredicates().length
        );
    }

}