import { httpClient } from "./httpClient";


export async function apiGetDashboard({ token }) {
    return httpClient.get("/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
    });
}

export async function apiCreateProject({ token, payload }) {
    return httpClient.post("/projects", payload, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

export async function apiToggleProjectStatus({ token, id }) {
    return httpClient.patch(`/projects/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

export async function apiUpdateProject({ token, id, payload }) {
    return httpClient.put(`/projects/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
    });
}
