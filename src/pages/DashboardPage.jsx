import React from "react";
import {
    Users,
    DollarSign,
    TrendingUp,
    Plus,
    Target,
    RefreshCw,
    LayoutDashboard,
    Zap,
    Briefcase,
    ChevronRight,
    Search
} from "lucide-react";
import { useDashboard } from "../hooks/useDashboard";
import { useProjectForm } from "../hooks/useProjectForm";
import { StatCard } from "../components/StatCard";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { Card } from "../components/Card";
import { Select } from "../components/Select";
import { money } from "../utils/formatters";
import { cn } from "../utils/cn";
import { ProjectList } from "../components/ProjectList";

export default function DashboardPage() {
    const dash = useDashboard();
    const form = useProjectForm(
        dash.token,
        (project) => {
            dash.setData((prev) => {
                if (!prev) return prev;
                const exists = prev.projects?.some(p => p.id === project.id);
                return {
                    ...prev,
                    projects: exists
                        ? prev.projects.map(p => p.id === project.id ? project : p)
                        : [project, ...(prev.projects || [])]
                };
            });
        },
        dash.setSelectedId
    );

    if (!dash.token) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center p-4">
                <Card className="w-full max-w-md p-10 text-center border-none shadow-2xl shadow-primary/10 relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/5 inca-pattern opacity-20" />
                    <div className="mb-8 flex justify-center hover:scale-105 transition-transform">
                        <img src="/apm.png" alt="APM Logo" className="h-16 w-auto" />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight text-obsidian">Acceso Corporativo</h2>
                    <p className="mt-2 text-xs text-muted-foreground">Ecosistema de Ingeniería</p>

                    <form onSubmit={dash.onLogin} className="mt-6 space-y-4 text-left">
                        <TextField
                            label="Correo Institucional"
                            value={dash.email}
                            onChange={dash.setEmail}
                            placeholder="usuario@apm-enterprise.com"
                        />
                        <TextField
                            label="Clave de Auditoría"
                            type="password"
                            value={dash.pass}
                            onChange={dash.setPass}
                            placeholder="••••••••"
                        />
                        <Button type="submit" className="w-full tracking-widest py-3 mt-4">
                            Iniciar Protocolo
                        </Button>
                    </form>

                    <div className="mt-8 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        APM Elite v5 • Professional System
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {dash.err && (
                <div className="rounded-xl bg-red-500 text-white p-4 animate-shake flex items-center gap-3 shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    <p className="text-xs font-bold tracking-wider">
                        Anomalía de Red Detectada: {dash.err.message || "Error Crítico"} (Cod: {dash.err.status || "401"})
                    </p>
                </div>
            )}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-obsidian">Panel de Control</h1>
                    <p className="text-muted-foreground mt-1">Bienvenido al ecosistema APM, {dash.data?.me?.name}</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" onClick={() => {
                        dash.load();
                        dash.setSelectedId(null);
                        form.cancelEdit();
                    }} disabled={dash.loading}>
                        <div className="flex items-center gap-2">
                            <RefreshCw size={16} className={cn("text-obsidian", dash.loading && "animate-spin")} />
                            <span className="text-obsidian font-bold">Actualizar</span>
                        </div>
                    </Button>
                </div>
            </div>

            <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <StatCard
                    title="Ingresos Totales"
                    value={dash.data ? money(dash.data.stats.revenue) : "$0.00"}
                    hint="Mensual"
                    icon={<DollarSign size={24} />}
                />
                <StatCard
                    title="Nuevos Usuarios"
                    value={dash.data ? String(dash.data.stats.newUsers) : "0"}
                    hint="Últimos 7 días"
                    icon={<Users size={24} />}
                />
                <StatCard
                    title="Tasa de Abandono"
                    value={dash.data ? `${Math.round(dash.data.stats.churn * 100)}%` : "0%"}
                    hint="Retención"
                    icon={<TrendingUp size={24} />}
                />
            </section>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8 space-y-8">
                    <Card className="p-0 border-none shadow-sm ring-1 ring-muted/20 overflow-hidden">
                        <div className="flex items-center justify-between border-b border-muted/10 bg-muted/5 p-6">
                            <h2 className="flex items-center gap-2 text-2xl font-black tracking-tight text-obsidian">
                                <div className="h-5 w-1.5 rounded-full bg-[#b48c54]" />
                                Listado de Proyectos
                            </h2>
                            <Select
                                value={dash.statusFilter}
                                onChange={dash.setStatusFilter}
                                options={[
                                    { value: "all", label: "Todos" },
                                    { value: "active", label: "Activo" },
                                    { value: "paused", label: "Pausado" },
                                ]}
                                className="w-40"
                            />
                        </div>

                        <div className="flex flex-col gap-[7px] p-6 pt-[5px]">
                            {dash.loading && !dash.data ? (
                                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                                    <RefreshCw size={20} className="animate-spin text-primary/40 mb-2" />
                                    <p className="text-xs">Sincronizando...</p>
                                </div>
                            ) : dash.filteredProjects.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                                    <Briefcase size={28} className="opacity-20 mb-2" />
                                    <p className="text-xs">Sin proyectos</p>
                                </div>
                            ) : (
                                dash.filteredProjects.slice(0, 5).map((p) => {
                                    const isActive = p.id === dash.selectedId;
                                    return (
                                        <button
                                            key={p.id}
                                            onDoubleClick={() => dash.setSelectedId(null)}
                                            onClick={() => { if (!isActive) dash.setSelectedId(p.id); }}
                                            className={`group flex items-center justify-between rounded-2xl p-5 transition-all duration-300 outline-none ${isActive
                                                ? "bg-primary/10 text-primary ring-1 ring-primary/20 shadow-md translate-x-1"
                                                : "hover:bg-primary/5 hover:translate-x-1"
                                                }`}
                                        >
                                            <div className="flex flex-col text-left">
                                                <span className={`text-[11px] font-bold uppercase tracking-widest ${isActive ? "text-primary opacity-80" : "text-muted-foreground opacity-60"
                                                    }`}>
                                                    {p.owner}
                                                </span>
                                                <span className={`text-xl font-black tracking-tight ${isActive ? "" : "text-obsidian"
                                                    }`}>{p.name}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold transition-all ${p.status === "active"
                                                    ? "bg-[#dcfce7] text-[#16a34a] border-transparent"
                                                    : "bg-[#FFE88C]/50 text-[#CA732D] border-[#FFE88C]"
                                                    }`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${p.status === "active" ? "bg-[#16a34a]" : "bg-[#CA732D]"
                                                        }`} />
                                                    {p.status === "active" ? "Activo" : "Pausado"}
                                                </span>
                                                <ChevronRight size={18} className={`transition-transform text-primary/40 ${isActive ? "translate-x-1 text-primary" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                                                    }`} />
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </Card>

                    <Card className="bg-primary/5 border-dashed border-2 border-primary/20 transition-all hover:bg-primary/[0.08] relative mb-12 group">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="flex items-center gap-2 font-black tracking-tight text-primary text-lg">
                                <Plus size={16} />
                                {form.editingId ? "Editar Proyecto" : "Nuevo Registro de Proyecto"}
                            </h2>
                            {form.editingId && (
                                <Button variant="ghost" size="sm" onClick={form.cancelEdit} className="text-[10px] uppercase tracking-widest text-primary hover:bg-primary/5">
                                    Cancelar Edición
                                </Button>
                            )}
                        </div>
                        <form onSubmit={form.onAction} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <TextField label="Nombre del Proyecto" value={form.name} onChange={form.setName} placeholder="Ej: Rediseño APM" error={form.nameErr} />
                                <TextField label="Responsable" value={form.owner} onChange={form.setOwner} placeholder="Ej: Arq. Carlos" error={form.ownerErr} />
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <TextField label="Presupuesto Inicial (PEN)" value={form.budget} onChange={form.setBudget} placeholder="0" error={form.budgetErr} />
                                <Select
                                    label="Estado"
                                    value={form.status}
                                    onChange={form.setStatus}
                                    options={[
                                        { value: "active", label: "Activo" },
                                        { value: "paused", label: "Pausado" },
                                    ]}
                                />
                            </div>
                            {form.formErr && (
                                <Badge variant="danger" className="w-full justify-center py-3 rounded-2xl animate-shake">
                                    {form.formErr}
                                </Badge>
                            )}
                            <div className="flex justify-end pt-4">
                                <Button disabled={form.saving} className="min-w-[200px] py-4 rounded-full shadow-2xl shadow-primary/30">
                                    {form.saving ? "Procesando..." : (form.editingId ? "Guardar Cambios" : "Generar Proyecto")}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                <div className="lg:col-span-4 max-lg:order-first">
                    {dash.selected ? (
                        <Card variant="glass" className="sticky top-28 space-y-8 animate-in zoom-in-95 duration-500">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Detalle Técnico</span>
                                    <h2 className="text-2xl font-black tracking-tight text-obsidian leading-none">{dash.selected.name}</h2>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">ID: {dash.selected.id}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => form.prepareEdit(dash.selected)}>
                                        Editar
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <DetailItem label="Responsable" value={dash.selected.owner} />
                                <DetailItem label="Estado Actual" value={<Badge variant={dash.selected.status === "active" ? "success" : "warn"}>{dash.selected.status === "active" ? "Activo" : "En Pausa"}</Badge>} />
                                <DetailItem label="Presupuesto" value={money(dash.selected.budget)} className="text-primary font-black" />
                            </div>

                            <div className="rounded-2xl bg-primary/10 p-4 border border-primary/20">
                                <p className="text-[10px] font-bold text-primary italic leading-relaxed">
                                    "La arquitectura de software no es sobre cómo se ve, sino sobre cómo resiste el cambio."
                                    <br />— APM Enterprise Engineering
                                </p>
                            </div>
                        </Card>
                    ) : (
                        <div className="sticky top-28 rounded-3xl border-2 border-dashed border-muted/30 p-12 text-center text-muted-foreground flex flex-col items-center justify-center bg-white/40">
                            <LayoutDashboard size={48} className="opacity-10 mb-4" />
                            <p className="text-sm font-medium">Selecciona un proyecto para inspeccionar la arquitectura</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function DetailItem({ label, value, className }) {
    return (
        <div className="flex items-center justify-between border-b border-muted/10 py-3 last:border-none">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</span>
            <div className={cn("text-sm font-bold text-obsidian", className)}>{value}</div>
        </div>
    );
}
