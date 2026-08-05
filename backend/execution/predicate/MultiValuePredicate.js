class MultiValuePredicate  extends BinaryPredicate {

    constructor(columnName, values) {

        super(columnName);

        this.values = values;

    }

    getValues() {

        return this.values;

    }


    compiledClass() {

        return CompiledMultiValuePredicate;

    }

}