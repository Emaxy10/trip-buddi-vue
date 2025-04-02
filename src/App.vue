<template>
  <v-layout >
    <NavBar/>
    <SideNav/>
    <Main/>
    
  </v-layout>
</template>

<script setup>
  //
  import { RouterLink, RouterView } from 'vue-router';
  import NavBar from './components/NavBar.vue';
  import SideNav from './components/SideNav.vue';
  import Main from './components/Main.vue';

</script>
