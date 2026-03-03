import React from 'react';

export function TextField({ label, value, onChange, placeholder, error }) {
    return (
        <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700 }}>{label}</span>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                style={{
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: error ? "1px solid #ff3b3b" : "1px solid #d9d9e3",
                    outline: "none",
                    fontSize: 14,
                }}
            />
            {error ? <span style={{ color: "#ff3b3b", fontSize: 12 }}>{error}</span> : null}
        </label>
    );
}
