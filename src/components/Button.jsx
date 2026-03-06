import React from "react";
import { cn } from "../utils/cn";

export function Button({
    children,
    variant = "primary",
    size = "md",
    className,
    icon,
    ...props
}) {
    const variants = {
        primary: "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90",
        secondary: "bg-white text-obsidian border border-muted/30 hover:bg-muted/10",
        outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/5",
        ghost: "bg-transparent text-muted-foreground hover:bg-muted/30 hover:text-obsidian",
        danger: "bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs rounded-xl",
        md: "px-5 py-2.5 text-sm rounded-2xl",
        lg: "px-7 py-3.5 text-base rounded-3xl",
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center gap-2 font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </button>
    );
}
