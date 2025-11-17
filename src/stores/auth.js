import router from "@/router";
import api from "@/services/api";
import { defineStore } from "pinia";


export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        errors: {},
        loading: false,
    }),
    actions: {
        async authenticate(apiRoute, formData) {
            this.loading = true;

            try {

                const res = await api.post(`/${apiRoute}`, formData);

                this.user = res.data.user;
                this.setToken(res.data.token)
                console.log(res);
                this.router.push({ name: 'dashboard' })

            } catch (error) {
                this.catchError(error);

            } finally {
                this.loading = false;
            }
        },

        setToken(token) {
            this.token = token;
            localStorage.setItem("token", token);
        },

        catchError(error) {
            if (error.response) {
                this.errors = error.response.data.errors || {};
            } else {
                console.error("Network Error:", error);
            }
        },

        async fetchUser() {
            if (!this.token) return;

            try {
                const res = await api.get("/user");
                this.user = res.data;
            } catch (e) {
                this.logout();
            }
        },

        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem("token");
            router.push({ name: 'login' });
        }

    }
})