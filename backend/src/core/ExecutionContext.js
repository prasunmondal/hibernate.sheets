class ExecutionContext {

    constructor(request, registry) {

        this.request = request;

        this.registry = registry;

        this.resources =
            new ResourceManager(registry);

        this.response =
            new ApiResponse(request.requestId);

        this.statistics =
            new Statistics();

    }
}