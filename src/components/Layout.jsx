import React, { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    User,
    ShieldAlert,
    Briefcase,
    Zap,
    Info
} from "lucide-react";
import { cn } from "../utils/cn";

export function Layout({ children, user, activeTab, setTab }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showSim, setShowSim] = useState(false);

    const getRoleTranslate = (role) => {
        if (!role) return "Usuario";
        const map = {
            "Engineering Lead": "Líder de Ingeniería",
            "admin": "Administrador de Sistemas",
            "developer": "Desarrollador General"
        };
        return map[role] || role;
    };

    return (
        <div className="flex min-h-screen bg-background font-sans transition-all duration-300 ease-in-out">
            <aside className={cn(
                "fixed left-0 top-0 z-40 hidden h-full flex-col border-r border-white/10 bg-primary px-4 py-8 lg:flex shadow-2xl transition-all duration-300 ease-in-out",
                isCollapsed ? "w-20" : "w-64"
            )}>
                <div className="flex flex-col items-center mb-12 overflow-hidden">
                    <img
                        src="/apm.png"
                        alt="APM Logo"
                        className={cn(
                            "w-auto transition-all duration-300 group-hover:drop-shadow-[0_4px_12px_rgba(255,255,255,0.4)]",
                            isCollapsed ? "h-10 mb-0" : "h-20 mb-2"
                        )}
                    />
                    {!isCollapsed && (
                        <>
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white animate-in fade-in zoom-in duration-300">Enterprise</span>
                            <div className="h-[2px] bg-white w-20 mt-6 animate-in fade-in duration-300" />
                        </>
                    )}
                </div>

                <nav className="flex-1 space-y-4">
                    <NavItem
                        icon={<LayoutDashboard size={20} />}
                        label="Dashboard"
                        active={activeTab === 'dashboard'}
                        isCollapsed={isCollapsed}
                        onClick={() => setTab('dashboard')}
                    />
                    <NavItem
                        icon={<Briefcase size={20} />}
                        label="Proyectos"
                        active={activeTab === 'projects'}
                        isCollapsed={isCollapsed}
                        onClick={() => setTab('projects')}
                    />
                    <NavItem
                        icon={<User size={20} />}
                        label="Usuarios"
                        active={activeTab === 'users'}
                        isCollapsed={isCollapsed}
                        onClick={() => setTab('users')}
                    />

                    {!isCollapsed && (
                        <div className={cn(
                            "mt-4 p-3 rounded-xl transition-all duration-500 border border-white/5 cursor-pointer",
                            showSim ? "bg-white/10 ring-1 ring-white/20" : "bg-white/5 hover:bg-white/10"
                        )} onClick={() => setShowSim(!showSim)}>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <span className="text-[8px] font-black text-white/50 tracking-widest flex items-center gap-2 uppercase">
                                        Ingeniería API
                                    </span>
                                    <p className="text-[10px] font-bold text-white tracking-tight">Control de Red</p>
                                </div>
                                <Zap size={14} className={cn("transition-all duration-500", showSim ? "text-accent" : "text-white/20")} />
                            </div>

                            {showSim && (
                                <div className="mt-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300" onClick={(e) => e.stopPropagation()}>
                                    <div className="grid grid-cols-3 gap-2">
                                        <button
                                            onClick={() => window.setSimulatedError(500)}
                                            className="flex flex-col items-center justify-center gap-2 rounded-lg bg-red-500/10 py-2 text-[10px] font-black text-white border border-white/10 hover:bg-red-500/20 transition-all active:scale-95"
                                        >
                                            <ShieldAlert size={14} /> 500
                                        </button>
                                        <button
                                            onClick={() => window.setSimulatedError(401)}
                                            className="flex flex-col items-center justify-center gap-2 rounded-lg bg-violet-500/10 py-2 text-[10px] font-black text-white border border-white/10 hover:bg-violet-500/20 transition-all active:scale-95"
                                        >
                                            <ShieldAlert size={14} /> 401
                                        </button>
                                        <button
                                            onClick={() => window.setSimulatedError(404)}
                                            className="flex flex-col items-center justify-center gap-2 rounded-lg bg-blue-500/10 py-2 text-[10px] font-black text-white border border-white/10 hover:bg-blue-500/20 transition-all active:scale-95"
                                        >
                                            <Info size={14} /> 404
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => {
                                            window.setSimulatedError(null);
                                            setShowSim(false);
                                        }}
                                        className="w-full rounded-lg bg-emerald-500/20 py-2 text-[10px] font-black text-white border border-white/10 hover:bg-emerald-500/30 transition-all"
                                    >
                                        Restaurar (200)
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </nav>

                <div className="mt-auto pt-4 flex flex-col items-center">
                    <button className={cn(
                        "flex items-center transition-all duration-300 group relative text-white",
                        isCollapsed
                            ? "w-14 h-14 justify-center rounded-2xl mx-auto mb-4 hover:bg-white/5"
                            : "w-full px-5 py-3.5 gap-4 rounded-2xl hover:bg-white/5 mb-2"
                    )}>
                        <LogOut size={20} className="group-hover:scale-110 transition-transform duration-300" />
                        <span className={cn(
                            "text-sm tracking-wide transition-all duration-300 overflow-hidden whitespace-nowrap",
                            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                        )}>
                            Cerrar Sesión
                        </span>
                        {isCollapsed && (
                            <div className="absolute left-full ml-4 hidden rounded-xl bg-white border border-primary/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-primary group-hover:block whitespace-nowrap z-50 shadow-2xl animate-in fade-in slide-in-from-left-2 duration-200">
                                Cerrar Sesión
                            </div>
                        )}
                    </button>

                    <div className="w-full border-t border-white/10 my-4 h-[1px]" />

                    {!isCollapsed && (
                        <img
                            src="/apm.png"
                            alt="Logotipo Inferior"
                            className="h-12 w-auto mb-4 transition-all duration-300 cursor-pointer opacity-40 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-in fade-in duration-300"
                        />
                    )}

                    <div className={cn(
                        "flex items-center w-full transition-all duration-300",
                        isCollapsed ? "flex-col gap-4" : "justify-between px-4 pb-4"
                    )}>
                        {!isCollapsed && (
                            <p className="text-[7px] font-black text-white uppercase tracking-[0.5em] animate-in fade-in duration-300">APM v3.5 Premium</p>
                        )}

                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className={cn(
                                "transition-all duration-300 flex items-center justify-center rounded-full hover:bg-white/5 w-12 h-12",
                                isCollapsed ? "text-white/50" : "text-white"
                            )}
                        >
                            {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
                        </button>
                    </div>
                </div>
            </aside>

            <div className={cn(
                "flex flex-1 flex-col transition-all duration-300 ease-in-out",
                isCollapsed ? "lg:pl-20" : "lg:pl-64"
            )}>
                <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-muted/10 bg-white px-8">
                    <div className="flex flex-1 items-center gap-4">
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-bold text-obsidian tracking-tight">{user?.name || "Usuario"}</p>
                            <p className="text-[10px] font-bold tracking-widest text-obsidian/40 uppercase">{getRoleTranslate(user?.role)}</p>
                        </div>
                        <div className="h-10 w-10 rounded-2xl bg-primary/10 border-2 border-primary/20 p-0.5 shadow-sm transform hover:rotate-3 transition-transform">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Wilber'}`}
                                alt="Avatar"
                                className="h-full w-full rounded-[14px] object-cover"
                            />
                        </div>
                    </div>
                </header>

                <main className="flex-1 px-8 py-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

function NavItem({ icon, label, active, isCollapsed, onClick }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center rounded-2xl transition-all duration-300 group relative shadow-none",
                isCollapsed ? "w-14 h-14 justify-center mx-auto" : "w-full px-5 py-3.5 gap-4",
                active
                    ? "bg-white text-primary font-bold"
                    : "text-white hover:bg-white/5"
            )}>
            <div className={cn("transition-transform duration-300 flex-shrink-0", active && !isCollapsed && "scale-105")}>
                {icon}
            </div>
            <span className={cn(
                "text-sm tracking-wide transition-all duration-300 overflow-hidden whitespace-nowrap",
                isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}>
                {label}
            </span>
            {isCollapsed && (
                <div className="absolute left-full ml-4 hidden rounded-xl bg-white border border-primary/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-primary group-hover:block whitespace-nowrap z-50 shadow-2xl animate-in fade-in slide-in-from-left-2 duration-200">
                    {label}
                </div>
            )}
        </button>
    );
}
