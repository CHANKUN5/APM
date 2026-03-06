import React from "react";
import {
    Users,
    DollarSign,
    TrendingUp,
    Plus,
    Filter,
    Search as SearchIcon,
    ChevronRight,
    RefreshCw,
    LogOut,
    LayoutDashboard
} from "lucide-react";
import { useDashboard } from "../hooks/useDashboard";
import { useProjectForm } from "../hooks/useProjectForm";
import { StatCard } from "../components/StatCard";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { Select } from "../components/Select";
import { money } from "../utils/formatters";
import { cn } from "../utils/cn";

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
            <div className="flex min-h-screen items-center justify-center bg-background px-4">
                <Card className="w-full max-w-md p-10 text-center shadow-2xl shadow-primary/10 border-none relative overflow-hidden ring-1 ring-primary/5">
                    <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/5 inca-pattern" />
                    <div className="mb-8 flex justify-center">
                        <img src="/apm.png" alt="APM Logo" className="h-24 w-auto drop-shadow-xl" />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight text-obsidian uppercase">Acceso Enterprise</h2>
                    <p className="mt-2 text-xs font-bold uppercase tracking-widest text-primary/60 italic">Design System v2.0</p>

                    <form onSubmit={dash.onLogin} className="mt-8 space-y-4 text-left">
                        <TextField
                            label="Correo Electrónico"
                            value={dash.email}
                            onChange={dash.setEmail}
                            placeholder="usuario@apm.com"
                        />
                        <TextField
                            label="Contraseña"
                            type="password"
                            value={dash.pass}
                            onChange={dash.setPass}
                            placeholder="••••••••"
                        />
                        <Button type="submit" className="w-full uppercase tracking-widest py-4 mt-6">
                            Ingresar al Sistema
                        </Button>
                    </form>

                    <div className="mt-6 text-xs text-muted-foreground/60 italic">
                        Dashboard Management v1.0 • APM Professional
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <Layout user={dash.data?.me}>
            <div className="space-y-8 animate-in fade-in duration-700">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-obsidian">Panel de Control</h1>
                        <p className="text-muted-foreground">Bienvenido al ecosistema APM, {dash.data?.me?.name}</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="secondary" icon={<RefreshCw size={18} />} onClick={() => {
                            dash.load();
                            dash.setSelectedId(null);
                            form.cancelEdit();
                        }} disabled={dash.loading}>
                            Actualizar
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
                        <Card className="p-0 border-none shadow-xl bg-white ring-1 ring-muted/20">
                            <div className="flex items-center justify-between border-b border-muted/10 bg-muted/5 p-8 relative text-xs">
                                <h2 className="flex items-center gap-3 text-xl font-black tracking-tight text-obsidian">
                                    <div className="h-8 w-1.5 rounded-full bg-primary" />
                                    Listado de Proyectos
                                </h2>
                                <div className="flex items-center gap-3">
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
                            </div>

                            <div className="p-2">
                                {dash.loading && !dash.data ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                                        <RefreshCw size={32} className="animate-spin text-primary/40 mb-4" />
                                        <p className="text-sm font-medium">Sincronizando base de datos...</p>
                                    </div>
                                ) : dash.filteredProjects.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-center px-4">
                                        <div className="h-20 w-20 rounded-full bg-muted/20 flex items-center justify-center mb-4">
                                            <SearchIcon size={32} className="opacity-20" />
                                        </div>
                                        <p className="font-bold text-obsidian">No se encontraron proyectos</p>
                                        <p className="text-xs">Ajusta los filtros para ver más resultados</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-1">
                                        {dash.filteredProjects.map((p) => {
                                            const isActive = p.id === dash.selectedId;
                                            return (
                                                <button
                                                    key={p.id}
                                                    onClick={() => dash.setSelectedId(p.id)}
                                                    onDoubleClick={() => dash.setSelectedId(null)}
                                                    className={cn(
                                                        "group flex items-center justify-between rounded-2xl p-5 transition-all duration-300",
                                                        isActive
                                                            ? "bg-primary/10 text-primary ring-1 ring-primary/20 shadow-md translate-x-1"
                                                            : "hover:bg-primary/5 hover:translate-x-1"
                                                    )}
                                                >
                                                    <div className="flex flex-col text-left">
                                                        <span className={cn("text-xs font-bold uppercase tracking-widest opacity-60", isActive ? "text-primary" : "text-muted-foreground")}>
                                                            {p.owner}
                                                        </span>
                                                        <span className="text-lg font-black tracking-tight">{p.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <Badge variant={p.status === "active" ? "success" : "warn"}>
                                                            {p.status === "active" ? "Activo" : "Pausado"}
                                                        </Badge>
                                                        <ChevronRight size={18} className={cn("transition-transform text-primary/40", isActive ? "translate-x-1 text-primary" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1")} />
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
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
                            <form onSubmit={form.onAction} className="space-y-8 relative z-10">
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                    <TextField label="Nombre del Proyecto" value={form.name} onChange={form.setName} placeholder="Ej: Rediseño APM" error={form.nameErr} />
                                    <TextField label="Responsable" value={form.owner} onChange={form.setOwner} placeholder="Ej: Arq. Carlos" error={form.ownerErr} />
                                </div>
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                    <TextField label="Presupuesto Inicial (PEN)" value={form.budget} onChange={form.setBudget} placeholder="0" error={form.budgetErr} />
                                    <Select
                                        label="Estado"
                                        value={form.status}
                                        onChange={form.setStatus}
                                        options={[
                                            { value: "active", label: "Activo" },
                                            { value: "paused", label: "En Pausa" },
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
                                        <h2 className="text-2xl font-black tracking-tight text-obsidian">{dash.selected.name}</h2>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => form.prepareEdit(dash.selected)}>
                                            Editar
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <DetailItem label="Responsable" value={dash.selected.owner} />
                                    <DetailItem label="Estado Actual" value={<Badge variant={dash.selected.status === "active" ? "success" : "warn"}>{dash.selected.status === "active" ? "Activo" : "Pausado"}</Badge>} />
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
        </Layout>
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
