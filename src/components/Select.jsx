import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../utils/cn";

export function Select({ value, onChange, options, label, className }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const selectedOption = options.find((opt) => opt.value === value) || options[0];

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={cn("flex flex-col gap-2.5", className)} ref={containerRef}>
            {label && (
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground px-1">
                    {label}
                </span>
            )}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "flex w-full items-center justify-between rounded-2xl bg-white px-6 py-4 text-sm font-bold shadow-sm ring-1 ring-muted/20 transition-all focus:ring-4 focus:ring-primary/10",
                        isOpen && "ring-primary/30 shadow-md"
                    )}
                >
                    <span className="text-obsidian tracking-wide">
                        {selectedOption.label}
                    </span>
                    <ChevronDown
                        size={16}
                        className={cn("text-primary transition-transform duration-300", isOpen && "rotate-180")}
                    />
                </button>

                {isOpen && (
                    <div className="absolute top-full right-0 z-50 mt-2 min-w-full overflow-hidden rounded-2xl border border-muted/10 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "w-full px-4 py-4 text-center text-xs font-bold tracking-widest transition-colors",
                                    option.value === value
                                        ? "bg-primary text-white"
                                        : "text-obsidian hover:bg-muted/30"
                                )}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
