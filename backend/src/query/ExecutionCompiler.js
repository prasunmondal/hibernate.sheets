class ExecutionCompiler {

    compile(context,
            worksheetData,
            executionPlan) {

        const compiledPlan = new CompiledPlan();

        compiledPlan.setId(
            executionPlan.getId()
        );

        const schema = worksheetData.getSchema();

        this.compilePredicates(
            schema,
            executionPlan,
            compiledPlan
        );

        this.compileOrderBy(
            schema,
            executionPlan,
            compiledPlan
        );

        this.compileProjections(
            schema,
            executionPlan,
            compiledPlan
        );

        this.copyPaging(
            executionPlan,
            compiledPlan
        );

        context.getDebug().add(
            "Compiled Predicates",
            compiledPlan.getPredicates().length
        );

        context.getDebug().add(
            "Compiled Order By",
            compiledPlan.getOrderBy().length
        );

        return compiledPlan;

    }

    compilePredicates(schema,
                      executionPlan,
                      compiledPlan) {

        const predicates = executionPlan.getPredicates();

        if (!predicates) {
            return;
        }

        for (let i = 0; i < predicates.length; i++) {

            compiledPlan.addPredicate(
                this.compilePredicate(
                    schema,
                    predicates[i]
                )
            );

        }

    }

    compilePredicate(schema,
                     predicate) {

        if (predicate instanceof EqualsPredicate) {

            return this.compileEqualsPredicate(
                schema,
                predicate
            );

        }

        throw new Error(
            "Unsupported predicate: " +
            predicate.constructor.name
        );

    }

    compileEqualsPredicate(schema,
                           predicate) {

        const columnIndex =
            schema.getColumnIndex(
                predicate.getColumnName()
            );

        if (columnIndex < 0) {

            throw new Error(
                "Unknown column: " +
                predicate.getColumnName()
            );

        }

        return new CompiledEqualsPredicate(
            columnIndex,
            predicate.getExpectedValue()
        );

    }

    compileOrderBy(schema,
                   executionPlan,
                   compiledPlan) {

        const orderBy = executionPlan.getOrderBy();

        if (!orderBy || orderBy.length === 0) {
            return;
        }

        for (let i = 0; i < orderBy.length; i++) {

            const item = orderBy[i];

            const columnIndex =
                schema.getColumnIndex(
                    item.getColumnName()
                );

            if (columnIndex < 0) {

                throw new Error(
                    "Unknown column: " +
                    item.getColumnName()
                );

            }

            compiledPlan.addOrderBy(

                new CompiledOrderBy(
                    columnIndex,
                    item.getDirection()
                )

            );

        }

    }

    compileProjections(schema,
                       executionPlan,
                       compiledPlan) {

        const projections =
            executionPlan.getProjections();

        if (!projections ||
            projections.length === 0) {
            return;
        }

        for (let i = 0; i < projections.length; i++) {

            compiledPlan.addProjection(

                this.compileProjection(
                    schema,
                    projections[i]
                )

            );

        }

    }

    compileProjection(schema,
                      projection) {

        const columnIndex =
            schema.getColumnIndex(
                projection.getColumnName()
            );

        if (columnIndex < 0) {

            throw new Error(
                "Unknown column: " +
                projection.getColumnName()
            );

        }

        return new CompiledProjection(

            columnIndex,

            projection.getColumnName()

        );

    }

    copyPaging(executionPlan,
               compiledPlan) {

        compiledPlan.setLimit(
            executionPlan.getLimit()
        );

        compiledPlan.setOffset(
            executionPlan.getOffset()
        );

    }

}