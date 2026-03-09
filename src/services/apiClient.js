import { httpClient } from "./httpClient";

const USERS_BASE_URL = "https://jsonplaceholder.typicode.com";

export const apiClient = {
    async getUsers() {
        try {
            const response = await fetch(`${USERS_BASE_URL}/users`);
            if (!response.ok) {
                const error = new Error("Error al obtener usuarios");
                error.status = response.status;
                throw error;
            }
            const data = await response.json();
            console.log("Users Data:", data);
            return data;
        } catch (err) {
            throw err;
        }
    },

    async getUserPosts(userId) {
        const response = await fetch(`${USERS_BASE_URL}/posts?userId=${userId}`);
        if (!response.ok) throw new Error("Error al obtener posts");
        const data = await response.json();
        console.log(`Posts (User ${userId}):`, data);
        return data;
    },

    async getPostComments(postId) {
        const response = await fetch(`${USERS_BASE_URL}/comments?postId=${postId}`);
        if (!response.ok) throw new Error("Error al obtener comentarios");
        const data = await response.json();
        console.log(`Comments (Post ${postId}):`, data);
        return data;
    }
};
