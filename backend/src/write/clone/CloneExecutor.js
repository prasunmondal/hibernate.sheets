class CloneExecutor {

    constructor() {

        this.executor =
            new ExecutionExecutor();

    }

    execute(context,
            worksheetData,
            compiledPlan) {

        const result =
            new ExecutionResult();

        const predicates =
            compiledPlan.getPredicates();

        const compiledValues =
            compiledPlan.getValues();

        const rows =
            worksheetData.getRows();

        let sourceRow = null;

        //
        // Find exactly one matching row
        //
        for (let i = 0; i < rows.length; i++) {

            const row = rows[i];

            if (!this.executor.matches(
                context,
                row,
                predicates
            )) {

                continue;

            }

            if (sourceRow !== null) {

                throw new Error(
                    "CLONE expects exactly one matching row."
                );

            }

            sourceRow = row;

        }

        if (sourceRow === null) {

            throw new Error(
                "No matching row found for CLONE."
            );

        }

        //
        // Clone values
        //
        const values =
            sourceRow.values.slice();

        //
        // Apply SET values
        //
        for (let i = 0; i < compiledValues.length; i++) {

            const value =
                compiledValues[i];

            values[value.columnIndex] =
                value.value;

        }

        //
        // Create cloned row
        //
        const clonedRow =
            new DataRow(
                -1,
                values
            );

        clonedRow.markNew();

        //
        // Add to worksheet
        //
        worksheetData.addRow(
            clonedRow
        );

        //
        // Track change
        //
        worksheetData
            .getChangeSet()
            .created
            .push(clonedRow);

        //
        // Return cloned row
        //
        result.addRow(
            clonedRow
        );

        result.inserted = 1;

        return result;

    }

}