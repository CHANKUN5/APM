/**
 * Professional Mock Server for APM Enterprise
 * Intercepts fetch calls to simulate a real backend with standard HTTP status codes.
 * This allows the application to use a real HTTP client even without a backend.
 */

const fakeDb = {
    me: { id: "u1", name: "Wilber", role: "admin" },
    stats: { revenue: 18340, newUsers: 27, churn: 0.04 },
    projects: [
        { id: "p1", name: "RV4", status: "active", owner: "Backend", budget: 6000 },
        { id: "p2", name: "Portal Real Estate", status: "paused", owner: "Frontend", budget: 4500 },
        { id: "p3", name: "ReflexoPeru", status: "active", owner: "Fullstack", budget: 7800 },
        { id: "p4", name: "Agentes IA", status: "active", owner: "IA", budget: 2500 },
    ],
};

function randomFail(prob = 0.15) {
    return Math.random() < prob;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const originalFetch = window.fetch;

window.fetch = async (url, options = {}) => {
    const { method, headers, body } = options;
    const token = headers?.["Authorization"]?.split(" ")[1];

    await sleep(600); // Simulate network latency

    // --- Auth Check ---
    if (!token || token !== "demo-token") {
        return new Response(JSON.stringify({ message: "No autorizado" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    // --- GET /dashboard ---
    if (url.includes("/dashboard") && method === "GET") {
        if (randomFail(0.1)) {
            return new Response(JSON.stringify({ message: "Error de red (simulado)" }), {
                status: 503,
                headers: { "Content-Type": "application/json" },
            });
        }
        return new Response(
            JSON.stringify({
                me: fakeDb.me,
                stats: fakeDb.stats,
                projects: fakeDb.projects,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    }

    // --- POST /projects ---
    if (url.includes("/projects") && method === "POST") {
        const payload = JSON.parse(body);
        if (!payload?.name || payload.name.trim().length < 3) {
            return new Response(JSON.stringify({ message: "Nombre inválido (mínimo 3 caracteres)" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        if (randomFail(0.2)) {
            return new Response(JSON.stringify({ message: "Error interno del servidor" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
        const newItem = {
            id: "p" + (fakeDb.projects.length + 1),
            name: payload.name.trim(),
            status: payload.status || "active",
            owner: payload.owner,
            budget: Number(payload.budget || 0),
        };
        fakeDb.projects = [newItem, ...fakeDb.projects];
        return new Response(JSON.stringify(newItem), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    }

    // --- PATCH /projects/:id/toggle ---
    if (url.includes("/projects/") && method === "PATCH") {
        const id = url.split("/")[url.split("/").length - 2];
        const idx = fakeDb.projects.findIndex((p) => p.id === id);
        if (idx === -1) {
            return new Response(JSON.stringify({ message: "Proyecto no encontrado" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
        if (randomFail(0.1)) {
            return new Response(JSON.stringify({ message: "Conflicto al actualizar" }), {
                status: 409,
                headers: { "Content-Type": "application/json" },
            });
        }
        const curr = fakeDb.projects[idx];
        const next = { ...curr, status: curr.status === "active" ? "paused" : "active" };
        fakeDb.projects[idx] = next;
        return new Response(JSON.stringify(next), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Fallback to original fetch for other URLs (like external assets)
    return originalFetch(url, options);
};

console.log("🚀 Professional Mock Server Initialized");
