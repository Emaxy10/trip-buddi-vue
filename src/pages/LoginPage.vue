<template>
    <v-sheet class="mx-auto">
        <v-form @submit.prevent="handleSubmit">
            <v-text-field
                v-model="user.email"
                label="Email"
            ></v-text-field>

            <v-text-field
                v-model="user.password"
                label="password"
                type="password"
            ></v-text-field>
            
                <v-btn
                    class="mt-2"
                    text="Submit"
                    type="submit"
                    block
                ></v-btn>
                <p v-if="errorMessage">{{ errorMessage }}</p>

                <!-- Show loader when loading is true -->
                <v-overlay v-model="loading" class="d-flex justify-center align-center" persistent>
                    <v-progress-circular
                    v-if="loading"
                    :size="70"
                    :width="10"
                    color="amber"
                    indeterminate
                    ></v-progress-circular>
                </v-overlay>
            
        </v-form>
    </v-sheet>
</template>

<script setup>
import api from '@/api/axios';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter();

const loading = ref(false)

const authStore = useAuthStore()
const user = ref({
    email: "",
    password: "",
})
const errorMessage = ref('');

const handleSubmit = async () => {
    loading.value = true
    try{
    const formData = new FormData()
    formData.append('email', user.value.email)
    formData.append('password', user.value.password)

    const response = await api.post(`/login`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
    })

    authStore.setTokens({
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    });

    authStore.setUser(response.data.user)

    
    console.log(authStore.user?.roles)

    router.push('/')
    }catch(error){
        errorMessage.value = 'Login failed. Please check your credentials.';
    }finally{
        loading.value = false
    }
}


</script>