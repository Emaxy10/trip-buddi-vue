<template>
    
    <!-- <v-app-bar app color="primary" dark>
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
        
    </v-app-bar> -->

    <v-app-bar app color="primary" dark>
    <!-- Logo / Title -->
    <v-toolbar-title>
      <router-link to="/" style="color: white; text-decoration: none;">Trip Buddi</router-link>
    </v-toolbar-title>

    <!-- Navigation Links -->
    <v-row class="ml-4" align="center" no-gutters>
      <v-col class="mr-2" cols="auto">
        <router-link to="#" style="color: white;">About Us</router-link>
      </v-col>
      <v-col cols="auto" class="mr-2">
        <router-link to="/place" style="color: white;">Places</router-link>
      </v-col>
      <v-col cols="auto">
        <router-link to="/add/trip" style="color: white;">Trips</router-link>
      </v-col>
    </v-row>

    <!-- Spacer to push content to the right -->
    <v-spacer></v-spacer>

    <!-- Search box -->
    <!-- <v-text-field
      v-model="searchQuery"
      append-icon="mdi-magnify"
      label="Search places"
      hide-details
      single-line
      dense
      outlined
      style="max-width: 250px;"
      @keyup.enter="performSearch"
    ></v-text-field> -->

    <!-- Auth Links -->
    <div v-if="authStore.accessToken">
      <router-link to="/" @click.prevent="logout" style="color: white;" class="ml-4">Logout</router-link>
      <router-link to="/profile" style="color: white;" class="ml-4">
        <v-icon left class="mr-1">mdi-account</v-icon>
      </router-link>
    </div>
    <div v-else>
      <router-link to="/login" style="color: white;" class="ml-4">Login</router-link>
      <router-link to="/register" style="color: white;" class="ml-2">Register</router-link>
    </div>
  </v-app-bar>
    
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'


const authStore = useAuthStore()
const router = useRouter()
const searchQuery = ref('');

function logout() {
    try{
        authStore.clearTokens()
        router.push('/login')
    }catch(error){
        console.error('An error occured',error)
    }
 
}

// const performSearch = async() => {
//     if (!searchQuery.value.trim()) return;

//     try{
       

//         router.push({ name: 'search_results', query: { q: searchQuery.value } });
//     }catch(error){
//         console.error('Search failed:', error);
//     }

//     console.log("Search button was clicked", searchQuery.value)
// }

</script>