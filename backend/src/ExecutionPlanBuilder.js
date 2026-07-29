class ExecutionPlanBuilder {

    build(operation) {

        const plan =
            new ExecutionPlan();

        for (const predicate of operation.getPredicates()) {

            plan.addPredicate(predicate);

        }

        plan.setLimit(operation.limit);

        plan.setOffset(operation.offset);

        return plan;

    }

}