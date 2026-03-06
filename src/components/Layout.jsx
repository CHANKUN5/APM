import React, { useState } from "react";
import { ChevronLeft, ChevronRight, LayoutDashboard, LogOut, Menu, Settings, User } from "lucide-react";
import { cn } from "../utils/cn";

export function Layout({ children, user }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

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
                            "w-auto transition-all duration-300",
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
                    <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active isCollapsed={isCollapsed} />
                    <NavItem icon={<User size={20} />} label="Perfil" isCollapsed={isCollapsed} />
                    <NavItem icon={<Settings size={20} />} label="Configuración" isCollapsed={isCollapsed} />
                </nav>

                <div className="mt-auto pt-4 flex flex-col items-center">
                    <button className={cn(
                        "flex items-center transition-all duration-300 group relative text-white",
                        isCollapsed
                            ? "w-14 h-14 justify-center rounded-2xl mx-auto mb-4"
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
                            alt="APM Interactive"
                            className="h-12 w-auto mb-4 transition-all duration-300 cursor-pointer opacity-40 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-110 animate-in fade-in duration-300"
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
                            <p className="text-sm font-bold text-obsidian">{user?.name || "Usuario"}</p>
                            <p className="text-xs text-muted-foreground">{user?.role || "Invitado"}</p>
                        </div>
                        <div className="h-10 w-10 rounded-2xl bg-primary/10 border-2 border-primary/20 p-0.5">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Wilber"
                                alt="Avatar"
                                className="h-full w-full rounded-[14px] object-cover"
                            />
                        </div>
                    </div>
                </header>

                <main className="flex-1 px-8 py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

function NavItem({ icon, label, active, isCollapsed }) {
    return (
        <button className={cn(
            "flex items-center rounded-2xl transition-all duration-300 group relative",
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
