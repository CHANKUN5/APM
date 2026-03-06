import React from "react";
import { cn } from "../utils/cn";

export function Badge({ children, variant = "neutral", className }) {
    const variants = {
        success: "bg-green-100 text-green-700 border-green-200",
        warn: "bg-amber-100 text-amber-700 border-amber-200",
        danger: "bg-red-100 text-red-700 border-red-200",
        neutral: "bg-slate-100 text-slate-600 border-slate-200",
        primary: "bg-primary/10 text-primary border-primary/20",
    };

    return (
        <span className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold transition-all",
            variants[variant],
            className
        )}>
            <span className={cn(
                "h-1.5 w-1.5 rounded-full bg-current opacity-80",
            )} />
            {children}
        </span>
    );
}
