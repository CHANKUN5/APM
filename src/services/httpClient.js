const BASE_URL = "https://api.apm-enterprise.com/v1";

async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.message || "Error de comunicación con el servidor");
        error.status = response.status;
        throw error;
    }
    return response.json();
}

const getHeaders = (extraHeaders = {}) => ({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer demo-token',
    ...extraHeaders,
});

export const httpClient = {
    async get(endpoint, options = {}) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: getHeaders(options.headers),
        });
        return handleResponse(response);
    },

    async post(endpoint, data, options = {}) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(options.headers),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async put(endpoint, data, options = {}) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: getHeaders(options.headers),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async patch(endpoint, data, options = {}) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers: getHeaders(options.headers),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async delete(endpoint, options = {}) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getHeaders(options.headers),
        });
        return handleResponse(response);
    }
};

