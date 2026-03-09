import { useState, useCallback, useEffect } from "react";
import { apiClient } from "../services/apiClient";


export function useUsers() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        if (window.SIMULATE_ERROR) setUsers([]);
        try {
            const data = await apiClient.getUsers();
            await new Promise(resolve => setTimeout(resolve, 1000));
            setUsers(data);
        } catch (err) {
            setUsers([]);
            const msg = err.status === 404 ? "Usuario no encontrado" :
                err.status === 401 ? "Sesión no autorizada" :
                    (err.message || "Falla de auditoría de red");
            setError({
                status: err.status || 500,
                message: msg
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const handleStatus = (e) => {
            if (e.detail.code !== 200) setUsers([]);
            fetchUsers();
        };
        window.addEventListener("apm:api_status", handleStatus);
        return () => window.removeEventListener("apm:api_status", handleStatus);
    }, [fetchUsers]);

    const fetchUserPosts = useCallback(async (userId) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiClient.getUserPosts(userId);
            setPosts(data);
        } catch (err) {
            setError({ status: err.status || 500, message: err.message || "Error al cargar posts" });
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchPostComments = useCallback(async (postId) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiClient.getPostComments(postId);
            setComments(data);
        } catch (err) {
            setError({ status: err.status || 500, message: err.message || "Error al cargar comentarios" });
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        users,
        posts,
        comments,
        loading,
        error,
        fetchUsers,
        fetchUserPosts,
        fetchPostComments,
        clearError: () => setError(null)
    };
}
