const fakeDb = {
    me: { id: "u1", name: "Wilber", role: "admin" },
    stats: { revenue: 18340, newUsers: 27, churn: 0.04 },
    projects: [
        { id: "p1", name: "RV4", status: "active", owner: "Backend", budget: 6000 },
        { id: "p2", name: "Portal Real Estate", status: "paused", owner: "Frontend", budget: 4500 },
        { id: "p3", name: "ReflexoPeru", status: "active", owner: "Fullstack", budget: 7800 },
        { id: "p4", name: "Agentes IA", status: "active", owner: "IA", budget: 2500 },
    ]
};

function randomFail(prob = 0.15) { return Math.random() < prob; }
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

export async function apiGetDashboard({ token }) {
    await sleep(700);
    if (!token) {
        const err = new Error("No autorizado");
        err.status = 401;
        throw err;
    }
    if (randomFail(0.12)) {
        const err = new Error("Error de red (simulado)");
        err.status = 503;
        throw err;
    }
    return {
        me: fakeDb.me,
        stats: fakeDb.stats,
        projects: fakeDb.projects,
    };
}

export async function apiCreateProject({ token, payload }) {
    await sleep(650);
    if (!token) {
        const err = new Error("No autorizado");
        err.status = 401;
        throw err;
    }
    if (!payload?.name || payload.name.trim().length < 3) {
        const err = new Error("Nombre inválido (mínimo 3 caracteres)");
        err.status = 400;
        throw err;
    }
    if (!payload?.owner) {
        const err = new Error("Owner requerido");
        err.status = 400;
        throw err;
    }
    if (randomFail(0.2)) {
        const err = new Error("No se pudo crear (simulado)");
        err.status = 500;
        throw err;
    }
    const newItem = {
        id: "p" + (fakeDb.projects.length + 1),
        name: payload.name.trim(),
        status: payload.status || "active",
        owner: payload.owner,
        budget: Number(payload.budget || 0),
    };
    fakeDb.projects = [newItem, ...fakeDb.projects];
    return newItem;
}

export async function apiToggleProjectStatus({ token, id }) {
    await sleep(450);
    if (!token) {
        const err = new Error("No autorizado");
        err.status = 401;
        throw err;
    }
    const idx = fakeDb.projects.findIndex((p) => p.id == id);
    if (idx == -1) {
        const err = new Error("No encontrado");
        err.status = 404;
        throw err;
    }
    if (randomFail(0.1)) {
        const err = new Error("Error al actualizar (simulado)");
        err.status = 409;
        throw err;
    }
    const curr = fakeDb.projects[idx];
    const next = { ...curr, status: curr.status === "active" ? "paused" : "active" };
    fakeDb.projects[idx] = next;
    return next;
}
