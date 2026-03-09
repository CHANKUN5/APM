import React, { useEffect, useState, useMemo } from "react";
import {
    Briefcase,
    Plus,
    RefreshCw,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    DollarSign,
    User
} from "lucide-react";
import { httpClient } from "../services/httpClient";
import { cn } from "../utils/cn";
import { money } from "../utils/formatters";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { Select } from "../components/Select";
import { ProjectList } from "../components/ProjectList";
import { useProjectForm } from "../hooks/useProjectForm";

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("all");
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const [selectedProject, setSelectedProject] = useState(null);

    const form = useProjectForm(
        "demo-token",
        (project) => {
            setProjects((prev) => {
                const exists = prev.some(p => p.id === project.id);
                return exists
                    ? prev.map(p => p.id === project.id ? project : p)
                    : [project, ...prev];
            });
        },
        () => { }
    );

    const loadData = async () => {
        setLoading(true);
        setError(null);
        if (window.SIMULATE_ERROR) setProjects([]);
        try {
            const res = await httpClient.get("/dashboard");
            await new Promise(r => setTimeout(r, 1000));
            if (res && res.projects) {
                setProjects(res.projects);
            }
        } catch (e) {
            setProjects([]);
            const msg = e.status === 404 ? "Proyecto no encontrado" :
                e.status === 401 ? "Sesión no autorizada" :
                    (e.message || "Falla de auditoría de red");
            setError({
                status: e.status || 500,
                message: msg
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleStatus = (e) => {
            if (e.detail.code !== 200) setProjects([]);
            loadData();
        };
        window.addEventListener("apm:api_status", handleStatus);
        return () => window.removeEventListener("apm:api_status", handleStatus);
    }, []);

    useEffect(() => {
        loadData();
    }, []);

    const filtered = useMemo(() => {
        return projects.filter(p => statusFilter === "all" ? true : p.status === statusFilter);
    }, [projects, statusFilter]);

    const totalPages = Math.ceil(filtered.length / pageSize) || 1;
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);


    useEffect(() => {
        if (page > totalPages) setPage(1);
    }, [filtered, page, totalPages]);

    if (selectedProject) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                <button
                    onClick={() => setSelectedProject(null)}
                    className="flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
                >
                    <ArrowLeft size={16} /> Volver al Listado
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                        <Card variant="glass" className="p-8 text-center space-y-6 sticky top-28 border-none ring-1 ring-primary/10 shadow-none">
                            <div className="mx-auto h-24 w-24 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary font-black text-4xl">
                                {selectedProject.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-obsidian tracking-tighter">{selectedProject.name}</h2>
                                <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1">{selectedProject.owner}</p>
                            </div>
                            <div className="pt-4 border-t border-muted/10 space-y-3">
                                <div className="flex items-center justify-between text-left py-1">
                                    <span className="text-xs font-medium text-obsidian/60 flex items-center gap-2"><DollarSign size={14} /> Presupuesto</span>
                                    <span className="text-sm font-black text-primary">{money(selectedProject.budget)}</span>
                                </div>
                                <div className="flex items-center justify-between text-left py-1">
                                    <span className="text-xs font-medium text-obsidian/60 flex items-center gap-2"><User size={14} /> Responsable</span>
                                    <span className="text-sm font-bold text-obsidian">{selectedProject.owner}</span>
                                </div>
                                <div className="flex items-center justify-between text-left py-1">
                                    <span className="text-xs font-medium text-obsidian/60">Estado</span>
                                    <Badge variant={selectedProject.status === "active" ? "success" : "warn"}>
                                        {selectedProject.status === "active" ? "Activo" : "Pausado"}
                                    </Badge>
                                </div>
                            </div>
                            <button
                                onClick={() => { setSelectedProject(null); form.prepareEdit(selectedProject); }}
                                className="w-full px-4 py-3 rounded-xl bg-obsidian/5 text-obsidian text-xs font-bold hover:bg-obsidian hover:text-white transition-all active:scale-95"
                            >
                                Editar Proyecto
                            </button>
                        </Card>
                    </div>

                    <div className="lg:col-span-8 space-y-8">
                        <Card className="p-8 bg-white border-none shadow-sm ring-1 ring-muted/20 rounded-3xl">
                            <h3 className="text-xl font-black text-obsidian mb-4 flex items-center gap-3">
                                <Briefcase className="text-primary" size={20} /> Ficha del Proyecto
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between border-b border-muted/10 py-3">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">ID</span>
                                    <span className="text-sm font-bold text-obsidian font-mono">{selectedProject.id}</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-muted/10 py-3">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Nombre</span>
                                    <span className="text-sm font-bold text-obsidian">{selectedProject.name}</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-muted/10 py-3">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Lider</span>
                                    <span className="text-sm font-bold text-obsidian">{selectedProject.owner}</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-muted/10 py-3">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Presupuesto</span>
                                    <span className="text-sm font-black text-primary">{money(selectedProject.budget)}</span>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Estado</span>
                                    <Badge variant={selectedProject.status === "active" ? "success" : "warn"}>
                                        {selectedProject.status === "active" ? "Activo" : "Pausado"}
                                    </Badge>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-8 bg-primary/10 border-none shadow-none ring-1 ring-primary/20 rounded-3xl">
                            <div className="flex items-center gap-4 text-primary">
                                <Briefcase size={32} />
                                <div>
                                    <p className="text-sm font-black tracking-tight">Gestión de Recursos APM</p>
                                    <p className="text-xs font-medium text-obsidian opacity-60">Proyecto auditado bajo estándar Enterprise APM v5.</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-obsidian tracking-tight">
                        Listado de Proyectos
                    </h1>
                    <p className="text-sm font-medium text-muted-foreground">
                        Inventario de Ingeniería Enterprise
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Select
                        value={statusFilter}
                        onChange={(val) => { setStatusFilter(val); setPage(1); }}
                        options={[
                            { value: "all", label: "Todo" },
                            { value: "active", label: "Activos" },
                            { value: "paused", label: "En Pausa" },
                        ]}
                        className="w-36"
                    />
                    <button
                        onClick={loadData}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white text-obsidian text-sm font-bold shadow-sm ring-1 ring-muted/20 hover:bg-muted/10 transition-all disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <RefreshCw size={16} className={loading ? "animate-spin text-primary" : ""} />
                        {loading ? "Cargando..." : "Actualizar"}
                    </button>
                </div>
            </header>

            {error && (
                <div className="p-6 rounded-3xl bg-red-500 text-white border border-red-600 flex items-center gap-4 animate-shake shadow-lg">
                    <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-widest">Inconsistencia de Red</p>
                        <p className="text-xs font-bold opacity-80">Código de Respuesta: {error.status || '503'}</p>
                    </div>
                </div>
            )}

            <Card className="p-0 border-none shadow-sm ring-1 ring-muted/20 overflow-hidden bg-white">
                <div className="p-0">
                    <ProjectList
                        projects={paginated}
                        loading={loading}
                        hasData={projects.length > 0}
                        onView={(proj) => setSelectedProject(proj)}
                        onEdit={(proj) => {
                            setSelectedProject(null);
                            form.prepareEdit(proj);
                        }}
                    />
                </div>

                <div className="p-6 border-t border-muted/10 bg-muted/5 flex items-center justify-between">
                    <p className="text-xs font-bold text-obsidian/40">
                        Página {page} de {totalPages}
                    </p>
                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="p-2 rounded-xl bg-white ring-1 ring-muted/20 text-obsidian disabled:opacity-20 hover:bg-primary/5 transition-all shadow-sm"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="p-2 rounded-xl bg-white ring-1 ring-muted/20 text-obsidian disabled:opacity-20 hover:bg-primary/5 transition-all shadow-sm"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
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

                <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start" onSubmit={form.onAction}>
                    <TextField
                        label="Nombre del Proyecto"
                        value={form.name}
                        onChange={form.setName}
                        error={form.nameErr}
                        placeholder="Ej: Portal RV4"
                    />
                    <TextField
                        label="Líder / Dueño"
                        value={form.owner}
                        onChange={form.setOwner}
                        error={form.ownerErr}
                        placeholder="Ej: Backend Team"
                    />
                    <TextField
                        label="Presupuesto"
                        value={form.budget}
                        onChange={form.setBudget}
                        error={form.budgetErr}
                        placeholder="0.00"
                        type="number"
                    />
                    <div>
                        <span className="block mb-2 text-xs font-bold text-obsidian uppercase tracking-wider">Estado</span>
                        <Select
                            value={form.status}
                            onChange={form.setStatus}
                            options={[
                                { value: "active", label: "Activo" },
                                { value: "paused", label: "En Pausa" },
                            ]}
                        />
                    </div>
                    {form.formErr && (
                        <Badge variant="danger" className="w-full justify-center py-3 rounded-2xl animate-shake lg:col-span-4">
                            {form.formErr}
                        </Badge>
                    )}
                    <div className="flex justify-end pt-4 lg:col-span-4">
                        <Button disabled={form.saving} className="min-w-[200px] py-4 rounded-full shadow-2xl shadow-primary/30">
                            {form.saving ? "Procesando..." : (form.editingId ? "Guardar Cambios" : "Generar Proyecto")}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

