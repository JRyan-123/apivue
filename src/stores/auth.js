// stores/auth.js
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import router from '@/router';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref(null);
    const token = ref(localStorage.getItem('token') || null);
    const errors = ref({});
    const loading = ref(false);

    // Getter
    const isAuthenticated = computed(() => !!token.value);

    // Actions
    const setToken = (t) => {
        token.value = t;
        localStorage.setItem('token', t);
    };

    const handleError = (err) => {
        if (err.response?.data?.errors) {
            errors.value = err.response.data.errors;
        } else {
            console.error('Network or unexpected error:', err);
        }
    };

    const authenticate = async (apiRoute, formData) => {
        loading.value = true;
        errors.value = {};
        try {
            const res = await api.post(`/${apiRoute}`, formData);
            user.value = res.data.user;
            setToken(res.data.token);
            router.push({ name: 'dashboard' });
            return true;
        } catch (err) {
            handleError(err);
            return false;
        } finally {
            loading.value = false;
        }
    };

    const fetchUser = async () => {
        if (!token.value) return;
        try {
            const res = await api.get('/user');
            user.value = res.data;
        } catch {
            logout();
        }
    };

    const logout = () => {
        token.value = null;
        user.value = null;
        localStorage.removeItem('token');
        router.push({ name: 'login' });
    };

    function clearErrors() {
        errors.value = {};
    }
    return {
        user,
        token,
        errors,
        loading,
        isAuthenticated,
        authenticate,
        fetchUser,
        logout,
        clearErrors
    };
});
