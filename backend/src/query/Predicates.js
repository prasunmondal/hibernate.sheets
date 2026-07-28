class Predicates {

    static equals(columnName, value) {

        return new EqualsPredicate(
            columnName,
            value
        );

    }

}