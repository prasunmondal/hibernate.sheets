class ExecutionContext {

    constructor(request) {

        this.request = request;

        this.registry = new Registry();

        this.resources =
            new ResourceManager(this.registry);

        this.response =
            new ApiResponse(request.requestId);

        this.statistics = new Statistics();
    }

}