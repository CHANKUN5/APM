import React, { useEffect, useState } from "react";
import {
    User,
    Mail,
    Globe,
    Briefcase,
    Search,
    ChevronRight,
    ArrowLeft,
    ExternalLink,
    ShieldCheck,
    Database,
    Fingerprint,
    RefreshCw,
    ChevronLeft,
    UserCircle2,
    Zap
} from "lucide-react";
import { useUsers } from "../hooks/useUsers";
import { apiClient } from "../services/apiClient";
import { cn } from "../utils/cn";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";

export default function UsersPage({ onError }) {
    const { users, loading, error, fetchUsers } = useUsers();
    const [selectedUser, setSelectedUser] = useState(null);
    const [page, setPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        if (error && onError) {
            onError(error.status || 500, error.message || "Falla de Auditoría");
        }
    }, [error, onError]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const filtered = users;
    const totalPages = Math.ceil(filtered.length / pageSize);
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

    if (selectedUser) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                <button
                    onClick={() => setSelectedUser(null)}
                    className="flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
                >
                    <ArrowLeft size={16} /> Volver al Listado
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                        <Card variant="glass" className="p-8 text-center space-y-6 sticky top-28 border-none ring-1 ring-primary/10 shadow-none">
                            <div className="mx-auto h-32 w-32 rounded-[2.5rem] bg-primary/10 p-1 border-2 border-primary/20">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.username}`}
                                    alt="Avatar"
                                    className="h-full w-full rounded-[2rem] object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-obsidian tracking-tighter">{selectedUser.name}</h2>
                                <p className="text-xs font-bold text-primary">@{selectedUser.username}</p>
                            </div>
                            <div className="pt-4 border-t border-muted/10 space-y-3">
                                <DetailItem icon={<Mail size={14} />} label="Email" value={selectedUser.email} />
                                <DetailItem icon={<Globe size={14} />} label="Sitio Web" value={selectedUser.website} />
                                <DetailItem icon={<Briefcase size={14} />} label="Compañía" value={selectedUser.company.name} />
                            </div>
                        </Card>
                    </div>

                    <div className="lg:col-span-8 space-y-8">
                        <Card className="p-8 bg-white border-none shadow-sm ring-1 ring-muted/20 rounded-3xl">
                            <h3 className="text-xl font-black text-obsidian mb-8 flex items-center gap-3">
                                <Fingerprint className="text-primary" /> Auditoría de Acceso
                            </h3>
                            <div className="space-y-4">
                                <ProjectRow name="RV4 Enterprise" role="Diseñador Principal" status="active" />
                                <ProjectRow name="Agentes IA Core" role="Auditor" status="paused" />
                                <ProjectRow name="Portal SAP Integración" role="Ingeniero de Software" status="active" />
                            </div>
                        </Card>

                        <Card className="p-8 bg-primary/10 border-none shadow-none ring-1 ring-primary/20 rounded-3xl">
                            <div className="flex items-center gap-4 text-primary">
                                <ShieldCheck size={32} />
                                <div>
                                    <p className="text-sm font-black tracking-tight">Protocolo de Seguridad</p>
                                    <p className="text-xs font-medium text-obsidian opacity-60">Usuario verificado bajo estándar AES-256 APM Enterprise.</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-obsidian tracking-tight">Directorio de Usuarios</h1>
                    <p className="text-sm font-medium text-obsidian/60 flex items-center gap-2">
                        Gestión de Identidades de Red
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary" onClick={fetchUsers} disabled={loading}>
                        <div className="flex items-center gap-2">
                            <RefreshCw size={16} className={cn("text-obsidian", loading && "animate-spin")} />
                            <span className="text-obsidian font-bold">Actualizar</span>
                        </div>
                    </Button>
                </div>
            </header>

            <Card className="p-0 overflow-hidden border-none shadow-sm ring-1 ring-muted/20 rounded-3xl bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-muted/5 border-b border-muted/10">
                                <th className="p-6 text-xs font-bold text-obsidian/60">Identidad</th>
                                <th className="p-6 text-xs font-bold text-obsidian/60">Organización</th>
                                <th className="p-6 text-xs font-bold text-obsidian/60">Dominio</th>
                                <th className="p-6 text-xs font-bold text-obsidian/60 text-right">Auditoría</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-muted/5">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="p-6"><div className="h-10 bg-muted/10 rounded-xl w-full" /></td>
                                        <td className="p-6"><div className="h-10 bg-muted/10 rounded-xl w-full" /></td>
                                        <td className="p-6"><div className="h-10 bg-muted/10 rounded-xl w-full" /></td>
                                        <td className="p-6 text-right"><div className="h-10 bg-muted/10 rounded-xl w-24 ml-auto" /></td>
                                    </tr>
                                ))
                            ) : paginated.map(u => (
                                <tr key={u.id} className="group hover:bg-primary/[0.03] transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs group-hover:bg-primary group-hover:text-white transition-all">
                                                {u.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-obsidian text-sm">{u.name}</p>
                                                <p className="text-xs text-obsidian/40 font-medium">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <p className="text-sm font-bold text-obsidian">{u.company.name}</p>
                                        <p className="text-xs text-obsidian/40 font-medium">{u.company.bs}</p>
                                    </td>
                                    <td className="p-6">
                                        <a href={`https://${u.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                                            {u.website} <ExternalLink size={12} />
                                        </a>
                                    </td>
                                    <td className="p-6 text-right">
                                        <button
                                            onClick={async () => {
                                                setSelectedUser(u);
                                                try {
                                                    console.group(`🔍 Auditoría Técnica: Usuario [${u.id}] ${u.name}`);
                                                    console.log("🚀 Iniciando trazabilidad de red profunda...");

                                                    const posts = await apiClient.getUserPosts(u.id);
                                                    console.log(`📦 Posts detectados (${posts.length}):`);
                                                    console.table(posts.slice(0, 3));

                                                    if (posts.length > 0) {
                                                        const comments = await apiClient.getPostComments(posts[0].id);
                                                        console.log(`💬 Comentarios en el post insignia [${posts[0].id}]:`);
                                                        console.table(comments.slice(0, 3));
                                                    }

                                                    console.log("✅ Trazabilidad completada con éxito.");
                                                    console.groupEnd();
                                                } catch (err) {
                                                    console.warn("⚠️ Auditoría profunda limitada:", err.message);
                                                    console.groupEnd();
                                                }
                                            }}
                                            className="px-4 py-2 rounded-xl bg-primary/5 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all active:scale-95 flex items-center gap-2 ml-auto"
                                        >
                                            Inspeccionar <ChevronRight size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-muted/10 bg-muted/5 flex items-center justify-between">
                    <p className="text-xs font-bold text-obsidian/40">
                        Página {page} de {totalPages || 1}
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
        </div>
    );
}

function DetailItem({ icon, label, value }) {
    return (
        <div className="flex items-center justify-between text-left py-1">
            <span className="text-xs font-medium text-obsidian/60 flex items-center gap-2">
                {icon} {label}
            </span>
            <span className="text-sm font-bold text-obsidian">{value}</span>
        </div>
    );
}

function ProjectRow({ name, role, status }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/5 border border-transparent">
            <div className="flex flex-col">
                <span className="text-sm font-black text-obsidian tracking-tight">{name}</span>
                <span className="text-xs font-medium text-obsidian/60">{role}</span>
            </div>
            <Badge variant={status === 'active' ? 'success' : 'warn'}>
                {status === 'active' ? 'Concedido' : 'Suspendido'}
            </Badge>
        </div>
    );
}
