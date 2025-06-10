<template>
  <v-layout >
    <NavBar/>
    <SideNav v-if="user_roles.some(role => role.name === 'admin' || role.name === 'manager')" />
    <Main/>
    
  </v-layout>
</template>

<script setup>
  //
  import { RouterLink, RouterView } from 'vue-router';
  import NavBar from './components/NavBar.vue';
  import SideNav from './components/SideNav.vue';
  import Main from './components/Main.vue';
  import { computed } from 'vue'



  import { useAuthStore } from '@/stores/auth'
  const authStore = useAuthStore()

  const user_roles = computed(() => authStore.user?.roles || [])

  

</script>
