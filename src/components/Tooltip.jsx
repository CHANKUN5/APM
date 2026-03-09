import React, { useState } from "react";
import { cn } from "../utils/cn";

export function Tooltip({ children, content, position = "top" }) {
    const [isVisible, setIsVisible] = useState(false);

    const positions = {
        top: "-top-2 left-1/2 -translate-x-1/2 -translate-y-full mb-2",
        bottom: "-bottom-2 left-1/2 -translate-x-1/2 translate-y-full mt-2",
        left: "top-1/2 -left-2 -translate-x-full -translate-y-1/2 mr-2",
        right: "top-1/2 -right-1 translate-x-full -translate-y-1/2 ml-4",
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className={cn(
                    "absolute z-[60] px-4 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-primary bg-white rounded-xl whitespace-nowrap shadow-2xl border border-primary/10 animate-in fade-in zoom-in-95 duration-200 pointer-events-none",
                    positions[position]
                )}>
                    {content}
                </div>
            )}
        </div>
    );
}
