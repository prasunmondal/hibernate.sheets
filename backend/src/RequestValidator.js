class RequestValidator {

    static validate(request) {

        if (!request) {
            throw new Error("Request cannot be null.");
        }

        const operations = request.getOperations();

        if (!operations || operations.length === 0) {
            throw new Error(
                "Request must contain at least one operation."
            );
        }

        const ids = new Set();

        for (const operation of operations) {

            if (ids.has(operation.getId())) {

                throw new Error(
                    "Duplicate operation id: " +
                    operation.getId()
                );

            }

            ids.add(operation.getId());

        }

        for (let i = 0; i < operations.length; i++) {
            this.validateOperation(
                operations[i],
                i
            );
        }

    }

    static validateOperation(operation, index) {

        if (!operation) {
            throw new Error(
                "Operation " + index + " is null."
            );
        }

        this.require(
            operation.getId(),
            "Operation " + index + " must specify an id."
        );

        switch (operation.type) {

            case OperationType.SELECT:
                this.validateSelect(operation, index);
                break;

            case OperationType.INSERT:
                this.validateInsert(operation, index);
                break;

            case OperationType.UPDATE:
                this.validateUpdate(operation, index);
                break;

            case OperationType.DELETE:
                this.validateDelete(operation, index);
                break;

            case OperationType.UPSERT:
                this.validateUpsert(operation, index);
                break;

            default:
                throw new Error(
                    "Unsupported operation type: " +
                    operation.type
                );

        }

    }

    static validateSelect(operation, index) {

        this.require(
            operation.spreadsheet,
            "Operation " + index +
            " must specify a spreadsheet."
        );

        this.require(
            operation.worksheet,
            "Operation " + index +
            " must specify a worksheet."
        );

        if (operation.limit < -1) {
            throw new Error(
                "Operation " + index +
                " has an invalid limit."
            );
        }

        if (operation.offset < 0) {
            throw new Error(
                "Operation " + index +
                " has an invalid offset."
            );
        }

        const predicates =
            operation.getPredicates();

        for (let i = 0; i < predicates.length; i++) {
            this.validatePredicate(
                predicates[i],
                i
            );
        }

    }

    static validateInsert(operation, index) {

        return true
        // throw new Error(
        //     "INSERT is not implemented."
        // );

    }

    static validateUpdate(operation, index) {

        return true
        // throw new Error(
        //     "UPDATE is not implemented."
        // );

    }

    static validateDelete(operation, index) {

        throw new Error(
            "DELETE is not implemented."
        );

    }

    static validateUpsert(operation, index) {

        throw new Error(
            "UPSERT is not implemented."
        );

    }

    static validatePredicate(predicate, index) {

        if (!predicate) {
            throw new Error(
                "Predicate " + index + " is null."
            );
        }

        if (predicate instanceof EqualsPredicate) {
            return this.validateEqualsPredicate(
                predicate,
                index
            );
        }

        throw new Error(
            "Unsupported predicate: " +
            predicate.constructor.name
        );

    }

    static validateEqualsPredicate(predicate, index) {

        this.require(
            predicate.getColumnName(),
            "Predicate " + index +
            " must specify a column."
        );

        if (predicate.getExpectedValue() === undefined) {
            throw new Error(
                "Predicate " + index +
                " must specify a value."
            );
        }

    }

    static require(value, message) {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            throw new Error(message);
        }

    }

}