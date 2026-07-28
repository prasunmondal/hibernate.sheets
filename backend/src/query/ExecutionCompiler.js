class ExecutionCompiler {

    compile(worksheetData, executionPlan) {

        const compiledPlan = new CompiledPlan();

        this.compilePredicates(
            worksheetData.getSchema(),
            executionPlan,
            compiledPlan
        );

        compiledPlan.setLimit(
            executionPlan.getLimit()
        );

        compiledPlan.setOffset(
            executionPlan.getOffset()
        );

        return compiledPlan;

    }

}