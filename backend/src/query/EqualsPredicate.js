class EqualsPredicate extends Predicate {

    constructor(columnName, expectedValue) {

        super();

        this.columnName = columnName;
        this.expectedValue = expectedValue;

    }

    getColumnName() {

        return this.columnName;

    }

    getExpectedValue() {

        return this.expectedValue;

    }

}