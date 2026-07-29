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
                operation
            );

        const result =
            this.engine.execute(
                context,
                worksheetData,
                plan
            );

        const apiResult =
            this.resultMapper.map(
                result,
                worksheetData
            );

        context.response.addResult(
            apiResult
        );
    }

}