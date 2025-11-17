<script setup>
import FormInput from '@/components/FormInput.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';

const formData = reactive({
    email: '',
    password: '',
})
async function login() {
    const success = await auth.authenticate("login", formData);
    if (success) {
        router.push({ name: "dashboard" });
    }
}

const auth = useAuthStore();
const { errors } = storeToRefs(auth);

onMounted(() => errors.value = {});
</script>
<template>
    <h1 class="text-3xl text-center mb-3">Register Form</h1>
    <main class="flex justify-center">

        <form @submit.prevent="login" class="w-1/2 ">

            <FormInput label="Email" type="email" placeholder="Enter Email" :error="errors.email?.[0]"
                v-model="formData.email" />
            <FormInput label="Password" type="password" placeholder="Enter Password" :error="errors.password?.[0]"
                v-model="formData.password" />

            <button class="w-full px-6 py-2 text-yellow-500 border border-yellow-500 rounded-lg 
                hover:bg-yellow-500 hover:text-black hover:scale-102 transition duration-200">
                Login
            </button>


        </form>
    </main>
</template>