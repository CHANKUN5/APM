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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

window.SIMULATE_ERROR = null;

const originalFetch = window.fetch;

window.fetch = async (url, options = {}) => {
    const isEnterpriseApi = url?.includes?.("api.apm-enterprise.com");
    const isExternalAudit = url?.includes?.("jsonplaceholder");
    const { method = "GET", headers, body } = options;

    let authHeader;
    if (headers instanceof Headers) {
        authHeader = headers.get("Authorization") || headers.get("authorization");
    } else {
        authHeader = headers?.["Authorization"] || headers?.["authorization"];
    }
    const token = authHeader?.split(" ")[1];

    if (!isEnterpriseApi && !isExternalAudit) {
        return Promise.resolve(
            new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            })
        );
    }

    console.group(`📡 APM Network: ${method} ${url}`);

    if (window.SIMULATE_ERROR) {
        await sleep(500);
        const errCode = window.SIMULATE_ERROR;
        console.error(`🚨 Anomalía Detectada: ${errCode}`);
        console.groupEnd();
        return new Response(JSON.stringify({ error: true, status: errCode, message: "Falla de Auditoría del Sistema" }), {
            status: errCode,
            headers: { "Content-Type": "application/json" },
        });
    }

    if (isEnterpriseApi && (!token || token !== "demo-token")) {
        console.warn(`⚠️ Seguridad Enterprise: Token Inválido o Ausente (${token})`);
        console.groupEnd();
        return new Response(JSON.stringify({ error: "No autorizado" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    let response;

    try {
        if (url.includes("/dashboard") && method === "GET") {
            const data = { me: fakeDb.me, stats: fakeDb.stats, projects: fakeDb.projects };
            console.log("📦 Portafolio Sync:");
            console.table(data.projects);
            response = new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });
        } else if (url.includes("/projects") && method === "POST") {
            const payload = JSON.parse(body);
            const newItem = { id: "p" + Date.now(), ...payload, status: "active" };
            fakeDb.projects = [newItem, ...fakeDb.projects];
            console.log("✅ Activo Vinculado:");
            console.table([newItem]);
            response = new Response(JSON.stringify(newItem), { status: 201, headers: { "Content-Type": "application/json" } });
        } else {
            const realRes = await originalFetch(url, options);
            if (isExternalAudit) {
                const clone = realRes.clone();
                try {
                    const jsonData = await clone.json();
                    console.log("📋 Auditoría Externa:");
                    console.table(jsonData.slice(0, 5));
                } catch (e) { }
            }
            console.groupEnd();
            return realRes;
        }
    } catch (e) {
        console.error("❌ Fallo Crítico en Interceptor:", e);
        console.groupEnd();
        return new Response(JSON.stringify({ error: true, message: "Error interno del servidor simulado" }), { status: 500 });
    }

    console.groupEnd();
    return response;
};

window.setSimulatedError = (code) => {
    window.SIMULATE_ERROR = code;
    const msg = code ? `Inyección código ${code}` : "Restaurado Protocolo 200";
    console.log(`🛠️ Control API: ${msg}`);

    const event = new CustomEvent("apm:api_status", { detail: { code: code || 200, message: msg } });
    window.dispatchEvent(event);
};
