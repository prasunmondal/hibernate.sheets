class CompiledEqualsPredicate extends CompiledPredicate {

    constructor(columnIndex, expectedValue) {

        super(columnIndex);

        this.expectedValue = expectedValue;

    }

    matches(row) {

        return row.values[this.columnIndex] === this.expectedValue;

    }

}