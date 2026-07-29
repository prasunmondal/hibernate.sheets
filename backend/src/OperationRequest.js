class OperationRequest {

    constructor() {

        this.type = OperationType.SELECT;

        this.spreadsheet = "";

        this.worksheet = "";

        this.predicates = [];

        this.limit = -1;

        this.offset = 0;

    }

    addPredicate(predicate) {

        this.predicates.push(predicate);

        return this;

    }

    getPredicates() {

        return this.predicates;

    }

}