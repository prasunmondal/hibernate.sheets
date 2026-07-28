class ExecutionPlan {

    constructor() {

        this.predicates = [];

        this.limit = -1;

        this.offset = 0;

        this.sorters = [];

        this.projections = [];

        this.useIndexes = true;

    }

}