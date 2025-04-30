<template>
    
    <v-app-bar app color="primary" dark>
        <v-toolbar-title>
           <router-link to="/" >Trip Buddi</router-link> 
        </v-toolbar-title>
        <router-link to="/place/add">Add a Place</router-link>
        <router-link to="/place">Places</router-link>
        <v-spacer></v-spacer>
        <div v-if="authStore.accessToken">
            <router-link to="/" @click.prevent="logout" style="color: white;">Logout</router-link>
        </div>
        <div v-else>
            <router-link to="/login">Login</router-link>
            <RouterLink to="/register">Register</RouterLink>
        </div>
        
    </v-app-bar>
    
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

function logout() {
    try{
        authStore.clearTokens()
        router.push('/login')
    }catch(error){
        console.error('An error occured',error)
    }
 
}
</script>