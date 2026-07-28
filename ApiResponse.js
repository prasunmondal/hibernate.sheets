class ApiResponse {

    constructor(requestId) {

        this.success = true;

        this.requestId = requestId;

        this.executionTime = 0;

        this.results = [];

        this.errors = [];

    }

    addResult(result) {

        this.results.push(result);

    }

    addError(error) {

        this.success = false;

        this.errors.push(error);

    }

}