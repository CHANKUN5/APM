import { useState, useEffect, useCallback, useRef } from "react";

export function useFetch(fetchFn, autoExecute = true, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const abortControllerRef = useRef(null);

    const execute = useCallback(async (...args) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        setLoading(true);
        setError(null);

        try {
            const result = await fetchFn(...args);
            setData(result);
            return result;
        } catch (err) {
            if (err.name === "AbortError") return;
            setData(null);
            setError({ message: err.message || "Error", status: err.status || 0 });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchFn]);

    useEffect(() => {
        const handleStatus = (e) => {
            if (autoExecute) {
                execute();
            }
        };
        window.addEventListener("apm:api_status", handleStatus);
        return () => window.removeEventListener("apm:api_status", handleStatus);
    }, [execute, autoExecute]);

    useEffect(() => {
        if (autoExecute) {
            execute();
        }

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, deps);

    return { data, loading, error, execute, setData, setError };
}
