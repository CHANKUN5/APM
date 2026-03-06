import React from "react";
import { cn } from "../utils/cn";

export function TextField({ label, value, onChange, placeholder, error, className, type = "text" }) {
    const id = `field-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-muted-foreground px-1">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={cn(
                    "w-full rounded-2xl bg-white px-5 py-3 text-sm shadow-sm border-2 border-transparent transition-all outline-none",
                    "placeholder:text-muted-foreground/60",
                    "focus:border-primary/20 focus:ring-4 focus:ring-primary/10",
                    error ? "border-red-500/20 bg-red-50/50 focus:ring-red-500/10" : "hover:bg-muted/10",
                    className
                )}
            />
            {error && (
                <p className="px-2 text-xs font-bold text-red-500 animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    );
}
