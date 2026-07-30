class ExecutionPlan {

    constructor() {

        this.predicates = [];
        this.limit = -1;
        this.offset = 0;

        this.orderBy = [];
        this.projections = [];

        this.useIndexes = true;

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
        return this;

    }

    getLimit() {

        return this.limit;

    }

    setOffset(offset) {

        this.offset = offset;
        return this;

    }

    getOffset() {

        return this.offset;

    }

    setUseIndexes(useIndexes) {

        this.useIndexes = useIndexes;
        return this;

    }

    isUseIndexes() {

        return this.useIndexes;

    }

    addOrderBy(order) {

        this.orderBy.push(order);

        return this;

    }

    getOrderBy() {

        return this.orderBy;

    }

    setOrderBy(orderBy) {

        this.orderBy = orderBy || [];

        return this;

    }

}