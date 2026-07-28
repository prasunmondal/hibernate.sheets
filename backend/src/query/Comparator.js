class ExecutionPlan {

    constructor() {

        this.predicates = [];

        this.limit = -1;

        this.offset = 0;

        this.sorters = [];

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

    setOffset(offset) {

        this.offset = offset;
        return this;

    }

    setUseIndexes(useIndexes) {

        this.useIndexes = useIndexes;
        return this;

    }

}