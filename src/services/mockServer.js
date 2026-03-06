
const fakeDb = {
    me: { id: "u1", name: "Wilber", role: "admin" },
    stats: { revenue: 18340, newUsers: 27, churn: 0.04 },
    projects: [
        { id: "p1", name: "RV4", status: "active", owner: "Backend", budget: 6000 },
        { id: "p2", name: "Portal Real Estate", status: "paused", owner: "Frontend", budget: 4500 },
        { id: "p3", name: "ReflexoPeru", status: "active", owner: "Fullstack", budget: 7800 },
        { id: "p4", name: "Agentes IA", status: "paused", owner: "IA", budget: 2500 },
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

    await sleep(600);

    if (!token || token !== "demo-token") {
        return new Response(JSON.stringify({ message: "No autorizado" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }


    if (url.includes("/dashboard") && method === "GET") {
        return new Response(
            JSON.stringify({
                me: fakeDb.me,
                stats: fakeDb.stats,
                projects: fakeDb.projects,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    }


    if (url.includes("/projects") && method === "POST") {
        const payload = JSON.parse(body);
        if (!payload?.name || payload.name.trim().length < 3) {
            return new Response(JSON.stringify({ message: "Nombre inválido (mínimo 3 caracteres)" }), {
                status: 400,
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


    if (url.includes("/projects/") && method === "PUT") {
        const id = url.split("/").pop();
        const payload = JSON.parse(body);
        const idx = fakeDb.projects.findIndex((p) => p.id === id);
        if (idx === -1) {
            return new Response(JSON.stringify({ message: "Proyecto no encontrado" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
        const updated = {
            ...fakeDb.projects[idx],
            name: payload.name.trim(),
            owner: payload.owner,
            budget: Number(payload.budget),
            status: payload.status
        };
        fakeDb.projects[idx] = updated;
        return new Response(JSON.stringify(updated), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }


    if (url.includes("/projects/") && method === "PATCH") {
        const id = url.split("/")[url.split("/").length - 2];
        const idx = fakeDb.projects.findIndex((p) => p.id === id);
        if (idx === -1) {
            return new Response(JSON.stringify({ message: "Proyecto no encontrado" }), {
                status: 404,
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

    return originalFetch(url, options);
};
