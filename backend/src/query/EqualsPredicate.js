class EqualsPredicate extends Predicate {

    constructor(columnIndex, expectedValue) {

        super();

        this.columnIndex = columnIndex;
        this.expectedValue = expectedValue;

    }

    matches(row) {

        return row.values[this.columnIndex] === this.expectedValue;

    }

}