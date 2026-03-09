import React from "react";
import { Briefcase, RefreshCw, ChevronRight } from "lucide-react";
import { Badge } from "./Badge";
import { money } from "../utils/formatters";

export function ProjectList({
    projects,
    loading,
    hasData,
    onView,
    onEdit
}) {
    if (loading && !hasData) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <RefreshCw size={24} className="animate-spin text-primary/40 mb-3" />
                <p className="text-xs">Sincronizando...</p>
            </div>
        );
    }

    if (!loading && (!projects || projects.length === 0)) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                <Briefcase size={32} className="opacity-20 mb-3" />
                <p className="text-xs">Sin registros</p>
            </div>
        );
    }

    const skeletonRows = Array.from({ length: 3 });

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-muted/5 border-b border-muted/10">
                        <th className="p-6 text-xs font-bold text-obsidian/60">Proyecto</th>
                        <th className="p-6 text-xs font-bold text-obsidian/60">Responsable</th>
                        <th className="p-6 text-xs font-bold text-obsidian/60">Presupuesto</th>
                        <th className="p-6 text-xs font-bold text-obsidian/60">Estado</th>
                        <th className="p-6 text-xs font-bold text-obsidian/60 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-muted/5">
                    {loading
                        ? skeletonRows.map((_, i) => (
                            <tr key={i} className="animate-pulse">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-muted/20" />
                                        <div className="space-y-2">
                                            <div className="h-3 w-28 rounded-full bg-muted/20" />
                                            <div className="h-2 w-16 rounded-full bg-muted/10" />
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6"><div className="h-3 w-20 rounded-full bg-muted/20" /></td>
                                <td className="p-6"><div className="h-3 w-16 rounded-full bg-muted/20" /></td>
                                <td className="p-6"><div className="h-6 w-16 rounded-full bg-muted/10" /></td>
                                <td className="p-6 text-right"><div className="h-8 w-24 rounded-xl bg-muted/10 ml-auto" /></td>
                            </tr>
                        ))
                        : projects.map((p) => (
                            <tr key={p.id} className="group hover:bg-primary/[0.03] transition-colors">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs group-hover:bg-primary group-hover:text-white transition-all">
                                            {p.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-obsidian text-sm">{p.name}</p>
                                            <p className="text-xs text-obsidian/40 font-medium uppercase tracking-widest">{p.owner}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <p className="text-sm font-bold text-obsidian">{p.owner}</p>
                                </td>
                                <td className="p-6">
                                    <p className="text-sm font-black text-primary">{money(p.budget)}</p>
                                </td>
                                <td className="p-6">
                                    <Badge variant={p.status === "active" ? "success" : "warn"}>
                                        {p.status === "active" ? "Activo" : "Pausado"}
                                    </Badge>
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex items-center gap-2 justify-end">
                                        {onView && (
                                            <button
                                                onClick={() => onView(p)}
                                                className="px-4 py-2 rounded-xl bg-primary/5 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all active:scale-95 flex items-center gap-2"
                                            >
                                                Ver <ChevronRight size={14} />
                                            </button>
                                        )}
                                        {onEdit && (
                                            <button
                                                onClick={() => onEdit(p)}
                                                className="px-4 py-2 rounded-xl bg-obsidian/5 text-obsidian text-xs font-bold hover:bg-obsidian hover:text-white transition-all active:scale-95"
                                            >
                                                Editar
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
