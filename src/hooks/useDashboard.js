import { useState, useEffect, useMemo } from "react";
import { apiGetDashboard, apiToggleProjectStatus } from "../services/api";

export function useDashboard() {
    const [token, setToken] = useState("demo-token");
    const [email, setEmail] = useState("admin@demo.com");
    const [pass, setPass] = useState("123456");

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    const [q, setQ] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedId, setSelectedId] = useState(null);

    const filteredProjects = useMemo(() => {
        const items = data?.projects || [];
        return items
            .filter((p) => (statusFilter === "all" ? true : p.status === statusFilter))
            .filter((p) => (q.trim() ? p.name.toLowerCase().includes(q.trim().toLowerCase()) : true));
    }, [data, q, statusFilter]);

    const selected = useMemo(() => {
        if (!data?.projects || !selectedId) return null;
        return data.projects.find((p) => p.id === selectedId) || null;
    }, [data, selectedId]);

    async function load() {
        setLoading(true);
        setErr(null);
        try {
            const res = await apiGetDashboard({ token });
            setData(res);
            if (!selectedId && res.projects?.[0]?.id) setSelectedId(res.projects[0].id);
        } catch (e) {
            setErr({ message: e.message || "Error", status: e.status || 0 });
            setData(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (token) {
            load();
        } else {
            setData(null);
        }
    }, [token]);

    async function onToggleStatus(id) {
        try {
            const updated = await apiToggleProjectStatus({ token, id });
            setData((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    projects: prev.projects.map((p) => (p.id === updated.id ? updated : p)),
                };
            });
        } catch (e) {
            alert(`Error: ${e.status || ""} ${e.message || ""}`.trim());
        }
    }

    function onLogin(e) {
        e.preventDefault();
        if (!email.includes("@") || pass.length < 3) {
            alert("Credenciales inválidas (simulado)");
            return;
        }
        setToken("demo-token");
    }

    function onLogout() {
        setToken("");
        setData(null);
    }

    return {
        token,
        email,
        setEmail,
        pass,
        setPass,
        data,
        setData,
        loading,
        err,
        setErr,
        q,
        setQ,
        statusFilter,
        setStatusFilter,
        selectedId,
        setSelectedId,
        filteredProjects,
        selected,
        load,
        onToggleStatus,
        onLogin,
        onLogout,
    };
}
