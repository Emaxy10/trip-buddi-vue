<template>
    
    <v-app-bar app color="primary" dark>
        <v-toolbar-title>
           <router-link to="/" >Trip Buddi</router-link> 
        </v-toolbar-title>
        <router-link to="/place/add">Add a Place</router-link>
        <router-link to="/place">Places</router-link>
        <v-spacer></v-spacer>
        <router-link to="/login">Login</router-link>
        <RouterLink to="/register">Register</RouterLink>
    </v-app-bar>
    
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>