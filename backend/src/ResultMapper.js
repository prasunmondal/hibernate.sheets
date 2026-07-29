class ResultMapper {

    constructor() {

        this.rowMapper =
            new RowMapper();

    }

    map(result, worksheetData) {

        const schema =
            worksheetData.getSchema();

        return {

            rowCount:
                result.getRowCount(),

            rows:
                this.mapRows(
                    result.getRows(),
                    schema
                )

        };

    }

    mapRows(rows, schema) {

        const mapped = [];

        for (let i = 0; i < rows.length; i++) {

            mapped.push(
                this.rowMapper.map(
                    rows[i],
                    schema
                )
            );

        }

        return mapped;

    }

}