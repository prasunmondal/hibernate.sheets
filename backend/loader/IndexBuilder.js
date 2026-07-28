class IndexBuilder {

    build(worksheetData) {

        const schema =
            worksheetData.schema;

        if (schema.primaryKeyIndex < 0) {
            return;
        }

        const index =
            new RowIndex(
                schema.primaryKeyIndex
            );

        for (const row of worksheetData.rows) {
            index.put(row);
        }

        worksheetData.indexes.push(index);

    }

}