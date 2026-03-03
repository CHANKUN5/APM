import React from 'react';

export function Button({ children, variant = "primary", disabled, onClick, type = "button" }) {
    const base = {
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #d0d7ff",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: 700,
        fontSize: 13,
    };

    const map = {
        primary: { background: disabled ? "#9aa6ff" : "#3b5bff", color: "#fff" },
        ghost: { background: "transparent", color: "#233876" },
        danger: { background: disabled ? "#ffb3b3" : "#ff3b3b", color: "#fff", border: "1px solid #ffd0d0" },
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={disabled ? undefined : onClick}
            style={{ ...base, ...(map[variant] || map.primary) }}
        >
            {children}
        </button>
    );
}
