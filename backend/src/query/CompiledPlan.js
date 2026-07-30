class CompiledPlan {

    constructor() {

        this.predicates = [];
        this.orderBy = [];

        this.limit = -1;

        this.offset = 0;

    }

    setOrderBy(orderBy) {

        this.orderBy = orderBy || [];

    }

    addOrderBy(order) {

        this.orderBy.push(order);

        return this;

    }

    getOrderBy() {

        return this.orderBy;

    }

    addPredicate(predicate) {

        this.predicates.push(predicate);

        return this;

    }

    getPredicates() {

        return this.predicates;

    }

    setLimit(limit) {

        this.limit = limit;

    }

    getLimit() {

        return this.limit;

    }

    setOffset(offset) {

        this.offset = offset;

    }

    getOffset() {

        return this.offset;

    }

}