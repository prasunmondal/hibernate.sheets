class ExecutionPlanBuilder {

    build(context, operation) {

        const plan =
            new ExecutionPlan();

        for (const predicate of operation.getPredicates()) {

            plan.addPredicate(predicate);

        }

        plan.setLimit(operation.getLimit());

        plan.setOffset(operation.offset);

        for (const order of operation.getOrderBy()) {
            plan.addOrderBy(order);
        }

        // console.log("Execution Plan: " + JSON.stringify(plan));
        context.getDebug().add("Execution Plan", plan);
        return plan;

    }

}