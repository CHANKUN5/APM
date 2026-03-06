import React from "react";
import { cn } from "../utils/cn";

export function Card({ children, className, variant = "default" }) {
    return (
        <div
            className={cn(
                "rounded-3xl p-6 transition-all duration-300",
                variant === "default" && "bg-white shadow-sm border border-muted/30",
                variant === "glass" && "bg-white/60 backdrop-blur-lg border border-white/40 shadow-lg",
                variant === "primary" && "bg-primary text-white shadow-primary/20 shadow-xl",
                className
            )}
        >
            {children}
        </div>
    );
}
