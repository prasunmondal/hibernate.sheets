class SchemaBuilder {

    build(worksheetData, rawWorksheet) {

        const schema = worksheetData.schema;
        const headers = rawWorksheet.headers;

        for (let i = 0; i < headers.length; i++) {

            const column = new ColumnSchema(headers[i], i);

            schema.addColumn(column);
        }
    }
}