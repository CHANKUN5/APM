import React from 'react';

export function StatCard({ title, value, hint }) {
    const cardStyle = {
        background: "#f8fafd",
        padding: 16,
        borderRadius: 16,
        border: "1px solid #e2e8f0"
    };

    return (
        <div style={cardStyle}>
            <div style={{ fontSize: 12, opacity: 0.8 }}>{title}</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>{value}</div>
            {hint ? <div style={{ marginTop: 8, fontSize: 12, opacity: 0.75 }}>{hint}</div> : null}
        </div>
    );
}
