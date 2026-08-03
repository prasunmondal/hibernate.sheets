class ExecutionPlanBuilder {

    build(context, operation) {

        const plan =
            new ExecutionPlan();

        plan.setId(operation.getId());


        for (const predicate of operation.getPredicates()) {

            plan.addPredicate(predicate);

        }

        plan.setLimit(operation.getLimit());

        plan.setOffset(
            operation.getOffset()
        );

        for (const order of operation.getOrderBy()) {
            plan.addOrderBy(order);
        }

        for (const projection of operation.getProjections()) {
            plan.addProjection(projection);
        }

        // console.log("Execution Plan: " + JSON.stringify(plan));
        context.getDebug().add("Execution Plan", plan);
        return plan;

    }

}