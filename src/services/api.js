import { httpClient } from "./httpClient";

/**
 * API Service for APM Enterprise
 * All functions use the centralized httpClient.
 * Professional error handling is managed at the client level.
 */

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
