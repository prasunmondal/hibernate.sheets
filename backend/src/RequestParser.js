class RequestParser {

    static parse(json) {

        if (!json) {
            throw new Error("Request is empty.");
        }

        const request =
            new ExecutionRequest();

        request.requestId =
            json.requestId || "";

        if (!Array.isArray(json.operations)) {
            throw new Error(
                "'operations' must be an array."
            );
        }

        for (const op of json.operations) {

            request.addOperation(
                this.parseOperation(op)
            );

        }

        return request;

    }

    static parseOperation(json) {

        const operation =
            new OperationRequest();

        operation.type = json.type ?? OperationType.SELECT;

        operation.spreadsheet =
            json.spreadsheet;

        operation.worksheet =
            json.worksheet;

        operation.limit =
            json.limit ?? -1;

        operation.offset =
            json.offset ?? 0;

        if (Array.isArray(json.where)) {

            for (const where of json.where) {

                operation.addPredicate(
                    this.parsePredicate(where)
                );

            }

        }

        return operation;

    }

    static parsePredicate(json) {

        switch (json.operator) {

            case "EQUALS":

                return Predicates.equals(
                    json.column,
                    json.value
                );

        }

        throw new Error(
            "Unsupported operator: " +
            json.operator
        );

    }

}