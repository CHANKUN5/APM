import React, { useEffect } from "react";
import {
    AlertCircle,
    X,
    ShieldAlert,
    CheckCircle2,
    Info,
    Activity
} from "lucide-react";
import { cn } from "../utils/cn";

export function ErrorModal({ isOpen, onClose, errorCode, message }) {
    useEffect(() => {
        if (isOpen && (errorCode === 200 || !errorCode)) {
            const timer = setTimeout(() => {
                onClose();
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [isOpen, errorCode, onClose]);

    if (!isOpen) return null;

    const isSuccess = errorCode === 200;

    const config = {
        500: {
            color: "text-white",
            bg: "bg-red-600",
            border: "border-red-700",
            icon: <ShieldAlert size={20} className="text-white" />,
            label: "Falla Crítica del Sistema"
        },
        404: {
            color: "text-white",
            bg: "bg-blue-600",
            border: "border-blue-700",
            icon: <Info size={20} className="text-white" />,
            label: "Recurso no Encontrado"
        },
        200: {
            color: "text-white",
            bg: "bg-emerald-500",
            border: "border-emerald-600",
            icon: <CheckCircle2 size={20} className="text-white" />,
            label: "Protocolo Restablecido"
        },
        401: {
            color: "text-white",
            bg: "bg-violet-600",
            border: "border-violet-700",
            icon: <ShieldAlert size={20} className="text-white" />,
            label: "Acceso no Autorizado"
        },
        default: {
            color: "text-white",
            bg: "bg-amber-500",
            border: "border-amber-600",
            icon: <Activity size={20} className="text-white" />,
            label: "Aviso de Auditoría"
        }
    };

    const current = config[errorCode] || config.default;

    return (
        <div className="fixed bottom-8 right-8 z-[100] animate-in slide-in-from-right-10 fade-in duration-500">
            <div className={cn(
                "group relative overflow-hidden rounded-2xl p-5 shadow-2xl border min-w-[300px] max-w-sm transition-all duration-300",
                current.bg,
                current.border
            )}>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        {current.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                            <h4 className={cn("text-[11px] font-black tracking-widest uppercase", current.color)}>
                                {current.label}
                            </h4>
                            <button onClick={onClose} className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-black/10 transition-all">
                                <X size={14} />
                            </button>
                        </div>
                        <p className={cn("text-sm font-medium tracking-tight leading-snug", current.color)}>
                            {message}
                        </p>
                    </div>
                </div>

                {isSuccess && (
                    <div className="mt-4 h-1 w-full bg-black/10 rounded-full overflow-hidden">
                        <div className="h-full bg-white animate-progress-shrink" />
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes progress-shrink {
                    from { width: 100%; }
                    to { width: 0%; }
                }
                .animate-progress-shrink {
                    animation: progress-shrink 2.5s linear forwards;
                }
            `}</style>
        </div>
    );
}
