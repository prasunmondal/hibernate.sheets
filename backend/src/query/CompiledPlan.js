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

}