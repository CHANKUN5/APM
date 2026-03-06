import React from "react";
import { Card } from "./Card";
import { cn } from "../utils/cn";

export function StatCard({ title, value, hint, icon, className }) {
    return (
        <Card className={cn("group flex flex-col gap-4 overflow-hidden relative", className)}>
            <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    {icon}
                </div>
                {hint && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/20 px-2 py-1 rounded-lg">
                        {hint}
                    </span>
                )}
            </div>

            <div>
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <h3 className="mt-1 text-3xl font-black tracking-tight text-obsidian">{value}</h3>
            </div>

            <div className="absolute -bottom-4 -right-4 h-24 w-24 opacity-[0.03] inca-pattern pointer-events-none rounded-full" />
        </Card>
    );
}
