class OperationRequest {

    constructor() {

        this.type = OperationType.SELECT;

        this.spreadsheet = "";

        this.worksheet = "";

        this.predicates = [];

        this.orderBy=[];

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

    addOrderBy(order) {

        this.orderBy.push(order);

        return this;

    }

    getOrderBy() {

        return this.orderBy;

    }

    getLimit() {
        return this.limit
    }

    getOffset() {
        return this.offset
    }

}