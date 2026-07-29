class CompiledPlan {

    constructor() {

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