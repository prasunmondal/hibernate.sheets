class ExecutionCompiler {

    compile(worksheetData, executionPlan) {

        const compiledPlan = new CompiledPlan();

        this.compilePredicates(
            worksheetData.getSchema(),
            executionPlan,
            compiledPlan
        );

        this.copyPaging(
            executionPlan,
            compiledPlan
        );

        return compiledPlan;

    }

    compilePredicates(schema,
                      executionPlan,
                      compiledPlan) {

        const predicates = executionPlan.getPredicates();

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