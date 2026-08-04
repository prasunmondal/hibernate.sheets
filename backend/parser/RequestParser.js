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

        operation.setId(
            json.id
        );

        if (Array.isArray(json.where)) {

            for (const where of json.where) {

                operation.addPredicate(
                    this.parsePredicate(where)
                );

            }

        }

        if (Array.isArray(json.orderBy)) {

            for (const item of json.orderBy) {

                operation.addOrderBy(

                    new OrderBy(
                        item.column,
                        item.direction
                    )

                );

            }

        }

        if (Array.isArray(json.select)) {

            for (const column of json.select) {

                if (typeof column !== "string") {

                    throw new Error(
                        "select must contain only column names."
                    );

                }

                operation.addProjection(
                    new Projection(column)
                );

            }

        }

        for (const column in json.values) {

            operation.addValue(

                new ColumnValue(
                    column,
                    json.values[column]
                )

            );

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