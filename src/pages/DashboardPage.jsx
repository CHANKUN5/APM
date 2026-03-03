import React from "react";
import { useDashboard } from "../hooks/useDashboard";
import { useProjectForm } from "../hooks/useProjectForm";
import { StatCard } from "../components/StatCard";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { money, classNames } from "../utils/formatters";

export default function DashboardPage() {
    const dash = useDashboard();
    const form = useProjectForm(
        dash.token,
        (newProject) => {
            dash.setData((prev) => ({
                ...prev,
                projects: [newProject, ...(prev?.projects || [])],
            }));
        },
        dash.setSelectedId
    );

    const styles = {
        page: { maxWidth: 1400, margin: "0 auto", padding: 20, fontFamily: "system-ui, sans-serif" },
        header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, paddingBottom: 16, borderBottom: "1px solid #e2e8f0" },
        main: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 },
        left: { display: "grid", gap: 20 },
        right: { display: "grid", gap: 20, alignContent: "start" },
        sectionTitle: { fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" },
        grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 },
        form: { display: "grid", gap: 16, background: "#f8fafd", padding: 20, borderRadius: 16, border: "1px solid #e2e8f0" },
        formRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
        formErr: { background: "#ffe7e7", color: "#a11a1a", padding: "8px 12px", borderRadius: 10, fontSize: 13 },
        smallInput: { padding: "8px 12px", borderRadius: 10, border: "1px solid #d9d9e3", fontSize: 14, outline: "none" },
        split: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" },
        list: { display: "grid", gap: 8 },
        notice: { padding: 20, textAlign: "center", background: "#f8fafd", borderRadius: 12, color: "#64748b", fontSize: 14 },
        errorBox: { background: "#fff1f1", border: "1px solid #ff000022", padding: 20, borderRadius: 16, color: "#a11a1a" },
        kv: { display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f1f5f9" },
        k: { fontWeight: 500, color: "#64748b", fontSize: 13 },
        v: { fontWeight: 700, color: "#1e293b", fontSize: 13 },
        detail: { background: "#fff", padding: 24, borderRadius: 16, border: "1px solid #e2e8f0" }
    };

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div style={{ display: "grid", gap: 4 }}>
                    <div style={{ fontSize: 18, fontWeight: 900 }}>Mini Dashboard</div>
                    <div style={{ fontSize: 12, opacity: 0.75 }}>Arquitectura profesional y escalable.</div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    {dash.token ? (
                        <>
                            <span style={{ fontSize: 13, opacity: 0.8 }}>
                                Sesion: <b>{dash.data?.me?.name || "..."}</b>
                            </span>
                            <Button variant="ghost" onClick={dash.load} disabled={dash.loading}>
                                Recargar
                            </Button>
                            <Button variant="danger" onClick={dash.onLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <form onSubmit={dash.onLogin} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <input
                                value={dash.email}
                                onChange={(e) => dash.setEmail(e.target.value)}
                                placeholder="email"
                                style={styles.smallInput}
                            />
                            <input
                                value={dash.pass}
                                onChange={(e) => dash.setPass(e.target.value)}
                                placeholder="password"
                                type="password"
                                style={styles.smallInput}
                            />
                            <Button type="submit">Login</Button>
                        </form>
                    )}
                </div>
            </header>

            <main style={styles.main}>
                <section style={styles.left}>
                    <div style={styles.sectionTitle}>Resumen</div>

                    {dash.loading ? (
                        <div style={styles.notice}>Cargando dashboard…</div>
                    ) : dash.err ? (
                        <div style={styles.errorBox}>
                            <div style={{ fontWeight: 800 }}>Error</div>
                            <div style={{ marginTop: 6, fontSize: 13 }}>
                                {dash.err.status ? `(${dash.err.status}) ` : ""}
                                {dash.err.message}
                            </div>
                            <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                                <Button onClick={dash.load}>Reintentar</Button>
                                <Button variant="ghost" onClick={() => dash.setErr(null)}>
                                    Cerrar
                                </Button>
                            </div>
                        </div>
                    ) : dash.data ? (
                        <>
                            <div style={styles.grid3}>
                                <StatCard title="Revenue" value={money(dash.data.stats.revenue)} hint="Mensual (simulado)" />
                                <StatCard title="Nuevos usuarios" value={String(dash.data.stats.newUsers)} hint="Últimos 7 días" />
                                <StatCard title="Churn" value={`${Math.round(dash.data.stats.churn * 100)}%`} hint="Mensual (simulado)" />
                            </div>

                            <div style={{ height: 16 }} />

                            <div style={styles.sectionTitle}>Crear proyecto</div>
                            <form onSubmit={form.onCreate} style={styles.form}>
                                <div style={styles.formRow}>
                                    <TextField label="Nombre" value={form.name} onChange={form.setName} placeholder="Ej: Clinica RV4" error={form.nameErr} />
                                    <TextField label="Owner" value={form.owner} onChange={form.setOwner} placeholder="Ej: Frontend" error={form.ownerErr} />
                                </div>
                                <div style={styles.formRow}>
                                    <TextField label="Budget (PEN)" value={form.budget} onChange={form.setBudget} placeholder="0" error={form.budgetErr} />
                                    <label style={{ display: "grid", gap: 6 }}>
                                        <span style={{ fontSize: 12, fontWeight: 700 }}>Status</span>
                                        <select
                                            value={form.status}
                                            onChange={(e) => form.setStatus(e.target.value)}
                                            style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #d9d9e3", fontSize: 14 }}
                                        >
                                            <option value="active">active</option>
                                            <option value="paused">paused</option>
                                        </select>
                                    </label>
                                </div>
                                {form.formErr ? <div style={styles.formErr}>{form.formErr}</div> : null}
                                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                    <Button disabled={form.saving}>{form.saving ? "Guardando..." : "Crear"}</Button>
                                    <span style={{ fontSize: 12, opacity: 0.75 }}>Nombre ≥ 3, owner requerido, budget numérico.</span>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div style={styles.notice}>Inicia sesión para ver el dashboard.</div>
                    )}
                </section>

                <section style={styles.right}>
                    <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 12 }}>
                        <div style={styles.sectionTitle}>Proyectos</div>
                        <div style={{ display: "flex", gap: 8 }}>
                            <input value={dash.q} onChange={(e) => dash.setQ(e.target.value)} placeholder="Buscar..." style={styles.smallInput} />
                            <select
                                value={dash.statusFilter}
                                onChange={(e) => dash.setStatusFilter(e.target.value)}
                                style={{ ...styles.smallInput, width: 140 }}
                            >
                                <option value="all">Todos</option>
                                <option value="active">Activos</option>
                                <option value="paused">Pausados</option>
                            </select>
                        </div>
                    </div>

                    {!dash.token ? (
                        <div style={styles.notice}>Sin token. Haz login arriba.</div>
                    ) : dash.loading ? (
                        <div style={styles.notice}>Cargando lista...</div>
                    ) : dash.data ? (
                        <div style={styles.split}>
                            <div style={styles.list}>
                                {dash.filteredProjects.length === 0 ? (
                                    <div style={styles.notice}>Sin resultados.</div>
                                ) : (
                                    dash.filteredProjects.map((p) => (
                                        <button
                                            key={p.id}
                                            onClick={() => dash.setSelectedId(p.id)}
                                            style={{
                                                display: "grid",
                                                gap: 4,
                                                textAlign: "left",
                                                padding: 16,
                                                borderRadius: 12,
                                                border: "1px solid",
                                                cursor: "pointer",
                                                background: p.id === dash.selectedId ? "#edf2ff" : "#fff",
                                                borderColor: p.id === dash.selectedId ? "#3b5bff" : "#e2e8f0"
                                            }}
                                        >
                                            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                                                <div style={{ fontWeight: 900, fontSize: 13 }}>{p.name}</div>
                                                <Badge tone={p.status === "active" ? "success" : "warn"}>{p.status}</Badge>
                                            </div>
                                            <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
                                                Owner: <b>{p.owner}</b> · Budget: <b>{money(p.budget)}</b>
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>

                            <div style={styles.detail}>
                                {!dash.selected ? (
                                    <div style={styles.notice}>Selecciona un proyecto.</div>
                                ) : (
                                    <>
                                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                                            <div style={{ display: "grid", gap: 4 }}>
                                                <div style={{ fontSize: 16, fontWeight: 900 }}>{dash.selected.name}</div>
                                                <div style={{ fontSize: 12, opacity: 0.75 }}>ID: {dash.selected.id}</div>
                                            </div>
                                            <div style={{ display: "flex", gap: 8 }}>
                                                <Button variant="ghost" onClick={() => dash.onToggleStatus(dash.selected.id)}>
                                                    Toggle status
                                                </Button>
                                            </div>
                                        </div>
                                        <div style={{ height: 12 }} />
                                        <div style={styles.kv}>
                                            <div style={styles.k}>Owner</div>
                                            <div style={styles.v}>{dash.selected.owner}</div>
                                        </div>
                                        <div style={styles.kv}>
                                            <div style={styles.k}>Status</div>
                                            <div style={styles.v}>
                                                <Badge tone={dash.selected.status === "active" ? "success" : "warn"}>{dash.selected.status}</Badge>
                                            </div>
                                        </div>
                                        <div style={styles.kv}>
                                            <div style={styles.k}>Budget</div>
                                            <div style={styles.v}>{money(dash.selected.budget)}</div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div style={styles.notice}>No hay datos.</div>
                    )}
                </section>
            </main>
        </div>
    );
}
