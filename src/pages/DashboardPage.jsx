import React from "react";
import { useDashboard } from "../hooks/useDashboard";
import { useProjectForm } from "../hooks/useProjectForm";
import { StatCard } from "../components/StatCard";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { money } from "../utils/formatters";

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
        sectionTitle: { fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" },
        smallInput: { padding: "8px 12px", borderRadius: 10, border: "1px solid #d9d9e3", fontSize: 14, outline: "none" },
        notice: { padding: 20, textAlign: "center", background: "#f8fafd", borderRadius: 12, color: "#64748b", fontSize: 14 },
    };

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div style={{ display: "grid", gap: 4 }}>
                    <div style={{ fontSize: 18, fontWeight: 900 }}>Mini Dashboard</div>
                    <div style={{ fontSize: 12, opacity: 0.75 }}>Arquitectura profesional y escalable para APM Enterprise.</div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    {dash.token ? (
                        <>
                            <span style={{ fontSize: 13, opacity: 0.8 }}>
                                Sesión: <b>{dash.data?.me?.name || "..."}</b>
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
                <section style={{ display: "grid", gap: 20 }}>
                    <div style={styles.sectionTitle}>Resumen</div>

                    {dash.loading ? (
                        <div style={styles.notice}>Cargando dashboard empresarial…</div>
                    ) : dash.err ? (
                        <div style={{ background: "#ffe7e7", color: "#a11a1a", padding: 20, borderRadius: 16, border: "1px solid #ffd0d0" }}>
                            <div style={{ fontWeight: 800, marginBottom: 4 }}>Error de API ({dash.err.status || "Network"})</div>
                            <div style={{ fontSize: 13 }}>{dash.err.message}</div>
                            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                                <Button onClick={dash.load}>Reintentar conexión</Button>
                                <Button variant="ghost" onClick={() => dash.setErr(null)}>Cerrar</Button>
                            </div>
                        </div>
                    ) : dash.data ? (
                        <>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                                <StatCard title="Revenue" value={money(dash.data.stats.revenue)} hint="Mensual (simulado)" />
                                <StatCard title="Nuevos usuarios" value={String(dash.data.stats.newUsers)} hint="Últimos 7 días" />
                                <StatCard title="Churn" value={`${Math.round(dash.data.stats.churn * 100)}%`} hint="Mensual (simulado)" />
                            </div>

                            <div style={{ height: 16 }} />

                            <div style={styles.sectionTitle}>Crear proyecto</div>
                            <form
                                onSubmit={form.onCreate}
                                style={{ display: "grid", gap: 16, background: "#f8fafd", padding: 20, borderRadius: 16, border: "1px solid #e2e8f0" }}
                            >
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                    <TextField label="Nombre" value={form.name} onChange={form.setName} placeholder="Ej: Proyecto APM" error={form.nameErr} />
                                    <TextField label="Owner" value={form.owner} onChange={form.setOwner} placeholder="Ej: Equipo Backend" error={form.ownerErr} />
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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
                                {form.formErr ? (
                                    <div style={{ background: "#ffe7e7", color: "#a11a1a", padding: "8px 12px", borderRadius: 10, fontSize: 13 }}>
                                        {form.formErr}
                                    </div>
                                ) : null}
                                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                    <Button disabled={form.saving}>{form.saving ? "Guardando..." : "Crear"}</Button>
                                    <span style={{ fontSize: 12, opacity: 0.75 }}>
                                        Reglas: nombre ≥ 3, owner requerido, budget numérico.
                                    </span>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div style={styles.notice}>Inicia sesión para ver el dashboard.</div>
                    )}
                </section>

                <section style={{ display: "grid", gap: 20, alignContent: "start" }}>
                    <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 12 }}>
                        <div style={styles.sectionTitle}>Proyectos</div>
                        <div style={{ display: "flex", gap: 8 }}>
                            <input
                                value={dash.q}
                                onChange={(e) => dash.setQ(e.target.value)}
                                placeholder="Buscar..."
                                style={styles.smallInput}
                            />
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
                        <div style={styles.notice}>Cargando lista empresarial...</div>
                    ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
                            <div style={{ display: "grid", gap: 8 }}>
                                {dash.filteredProjects.length === 0 ? (
                                    <div style={{ padding: 40, textAlign: "center", color: "#94a3b8", background: "#f8fafd", borderRadius: 16, border: "2px dashed #e2e8f0" }}>
                                        <div style={{ fontSize: 24, marginBottom: 8 }}>📁</div>
                                        Sin resultados.
                                    </div>
                                ) : (
                                    dash.filteredProjects.map((p) => {
                                        const active = p.id === dash.selectedId;
                                        const tone = p.status === "active" ? "success" : "warn";
                                        return (
                                            <button
                                                key={p.id}
                                                onClick={() => dash.setSelectedId(p.id)}
                                                style={{
                                                    textAlign: "left", width: "100%", border: active ? "2px solid #3b5bff" : "1px solid #e2e8f0",
                                                    background: "#fff", borderRadius: 12, padding: 16, cursor: "pointer",
                                                    boxShadow: active ? "0 10px 30px rgba(59,91,255,0.12)" : "none"
                                                }}
                                            >
                                                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                                                    <div style={{ fontWeight: 900, fontSize: 13 }}>{p.name}</div>
                                                    <Badge tone={tone}>{p.status}</Badge>
                                                </div>
                                                <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
                                                    Owner: <b>{p.owner}</b> · Budget: <b>{money(p.budget)}</b>
                                                </div>
                                            </button>
                                        );
                                    })
                                )}
                            </div>

                            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, minHeight: 200, position: "sticky", top: 20 }}>
                                {!dash.selected ? (
                                    <div style={{ textAlign: "center", color: "#94a3b8", marginTop: 40 }}>
                                        Selecciona un proyecto para ver detalles.
                                    </div>
                                ) : (
                                    <>
                                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                                            <div style={{ display: "grid", gap: 4 }}>
                                                <div style={{ fontSize: 16, fontWeight: 900 }}>{dash.selected.name}</div>
                                                <div style={{ fontSize: 12, opacity: 0.75 }}>ID: {dash.selected.id}</div>
                                            </div>
                                            <Button variant="ghost" onClick={() => dash.onToggleStatus(dash.selected.id)}>
                                                Toggle status
                                            </Button>
                                        </div>
                                        <div style={{ height: 12 }} />
                                        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f1f5f9" }}>
                                            <div style={{ fontSize: 12, color: "#64748b" }}>Owner</div>
                                            <div style={{ fontSize: 13, fontWeight: 600 }}>{dash.selected.owner}</div>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f1f5f9" }}>
                                            <div style={{ fontSize: 12, color: "#64748b" }}>Status</div>
                                            <Badge tone={dash.selected.status === "active" ? "success" : "warn"}>
                                                {dash.selected.status}
                                            </Badge>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
                                            <div style={{ fontSize: 12, color: "#64748b" }}>Budget</div>
                                            <div style={{ fontSize: 13, fontWeight: 600 }}>{money(dash.selected.budget)}</div>
                                        </div>
                                        <div style={{ height: 16 }} />
                                        <div style={{ fontSize: 11, color: "#94a3b8", fontStyle: "italic", lineHeight: 1.4 }}>
                                            Arquitectura profesional: lógica en hooks, comunicación centralizada.
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
