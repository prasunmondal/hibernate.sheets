class SheetEngine {

    static instance() {

        if (!SheetEngine._instance) {

            SheetEngine._instance =
                new SheetEngine();

        }

        return SheetEngine._instance;

    }

    constructor() {

        this.config = new EngineConfig();

        this.registry = new Registry();

    }

    handlePost(e) {

        try {

            const request =
                JSON.parse(e.postData.contents);

            const context =
                new ExecutionContext(request);

            context.registry = this.registry;

            context.provider =
                new GoogleSheetsProvider(this.registry);

            context.response =
                new ApiResponse(request.requestId);

            context.finish();

            context.response.executionTime =
                context.statistics.executionTime;

            return ContentService
                .createTextOutput(
                    JSON.stringify(context.response)
                )
                .setMimeType(ContentService.MimeType.JSON);

        } catch (ex) {

            return ContentService
                .createTextOutput(
                    JSON.stringify({
                        success: false,
                        error: ex.message
                    })
                )
                .setMimeType(ContentService.MimeType.JSON);

        }

    }

    handleGet() {

        return ContentService
            .createTextOutput("SheetEngine Running");

    }

}