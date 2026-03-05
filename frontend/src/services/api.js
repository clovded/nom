const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const api = async (path, options = {}) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        },
        ...options
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
};
