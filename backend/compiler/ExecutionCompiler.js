class ExecutionCompiler {

    constructor() {

        this.predicateMap = new Map([

            [EqualsPredicate, CompiledEqualsPredicate],
            [NotEqualsPredicate, CompiledNotEqualsPredicate],

            [GreaterThanPredicate, CompiledGreaterThanPredicate],
            [GreaterThanEqualsPredicate, CompiledGreaterThanEqualsPredicate],

            [LessThanPredicate, CompiledLessThanPredicate],
            [LessThanEqualsPredicate, CompiledLessThanEqualsPredicate],

            [ContainsPredicate, CompiledContainsPredicate],
            [StartsWithPredicate, CompiledStartsWithPredicate],
            [EndsWithPredicate, CompiledEndsWithPredicate],

            // [InPredicate, CompiledInPredicate],
            // [BetweenPredicate, CompiledBetweenPredicate],

            [IsNullPredicate, CompiledIsNullPredicate],
            [IsNotNullPredicate, CompiledIsNotNullPredicate]

        ]);

    }

    compile(context,
            worksheetData,
            executionPlan) {

        const compiledPlan = new CompiledPlan();

        compiledPlan.setId(
            executionPlan.getId()
        );

        compiledPlan.setType(
            executionPlan.getType()
        );

        const schema =
            worksheetData.getSchema();

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

        this.compileValues(
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

    compileBinaryPredicate(schema,
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

        const clazz =
            predicate.compiledClass();

        return new clazz(

            columnIndex,

            predicate.getExpectedValue()

        );

    }

    compileUnaryPredicate(schema,
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

        const clazz =
            predicate.compiledClass();

        return new clazz(
            columnIndex
        );

    }

    compilePredicates(schema,
                      executionPlan,
                      compiledPlan) {

        const predicates =
            executionPlan.getPredicates();

        if (!predicates) {
            return;
        }

        for (const predicate of predicates) {

            compiledPlan.addPredicate(

                this.compilePredicate(
                    schema,
                    predicate
                )

            );

        }

    }

    compilePredicate(schema,
                     predicate) {

        if (predicate instanceof BinaryPredicate) {

            return this.compileBinaryPredicate(
                schema,
                predicate
            );

        }

        if (predicate instanceof UnaryPredicate) {

            return this.compileUnaryPredicate(
                schema,
                predicate
            );

        }

        throw new Error(
            "Unsupported predicate: " +
            predicate.constructor.name
        );

    }

    compileSimplePredicate(schema,
                           predicate,
                           compiledType) {

        return new compiledType(

            this.getColumnIndex(
                schema,
                predicate.getColumnName()
            ),

            predicate.getExpectedValue()

        );

    }

    compileOrderBy(schema,
                   executionPlan,
                   compiledPlan) {

        const orderBy =
            executionPlan.getOrderBy();

        if (!orderBy ||
            orderBy.length === 0) {

            return;

        }

        for (const item of orderBy) {

            compiledPlan.addOrderBy(

                new CompiledOrderBy(

                    this.getColumnIndex(
                        schema,
                        item.getColumnName()
                    ),

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

        for (const projection of projections) {

            compiledPlan.addProjection(

                this.compileProjection(
                    schema,
                    projection
                )

            );

        }

    }

    compileProjection(schema,
                      projection) {

        return new CompiledProjection(

            this.getColumnIndex(
                schema,
                projection.getColumnName()
            ),

            projection.getColumnName()

        );

    }

    compileValues(schema,
                  executionPlan,
                  compiledPlan) {

        const values =
            executionPlan.getValues();

        if (!values ||
            values.length === 0) {
            return;
        }

        for (const value of values) {

            compiledPlan.addValue(

                this.compileValue(
                    schema,
                    value
                )

            );

        }

    }

    compileValue(schema,
                 value) {

        return new CompiledColumnValue(

            this.getColumnIndex(
                schema,
                value.getColumnName()
            ),

            value.getColumnName(),

            value.getValue()

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

    getColumnIndex(schema,
                   columnName) {

        const columnIndex =
            schema.getColumnIndex(
                columnName
            );

        if (columnIndex < 0) {

            throw new Error(
                "Unknown column: " +
                columnName
            );

        }

        return columnIndex;

    }
}