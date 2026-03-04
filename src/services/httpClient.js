/**
 * Centralized HTTP Client for APM Enterprise
 * Handles baseURL, headers, and standard error responses.
 */

const BASE_URL = "https://api.apm-enterprise.com/v1"; // Simulated base URL

async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.message || "Error de comunicación con el servidor");
        error.status = response.status;
        throw error;
    }
    return response.json();
}

export const httpClient = {
    async get(endpoint, options = {}) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        return handleResponse(response);
    },

    async post(endpoint, data, options = {}) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async put(endpoint, data, options = {}) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async patch(endpoint, data, options = {}) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async delete(endpoint, options = {}) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        return handleResponse(response);
    }
};
