class Stopwatch {

    static start() {
        return Date.now();
    }

    static elapsed(start) {
        return Date.now() - start;
    }

    static measure(action) {

        const start = Date.now();

        const result = action();

        return {
            result: result,
            elapsed: Date.now() - start
        };

    }

}