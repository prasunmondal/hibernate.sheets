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

            const json = JSON.parse(e.postData.contents);

            const request =
                RequestParser.parse(json);

            RequestValidator.validate(request);

            const context =
                new ExecutionContext(
                    request,
                    this.registry
                );

            context.provider =
                new GoogleSheetsProvider(
                    context.resources
                );

            const service =
                new ExecutionService();

            service.execute(context);

            context.response.executionTime =
                context.statistics.execution.totalTime;

            return this.buildResponse(
                context.response
            );

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

    buildResponse(response) {

        return ContentService
            .createTextOutput(
                JSON.stringify(response)
            )
            .setMimeType(ContentService.MimeType.JSON);

    }

    handleGet() {

        return ContentService
            .createTextOutput("SheetEngine Running");

    }

}