<template>
    <v-main class="d-flex align-center justify-center" >
      <v-container>
        <router-view></router-view> 
      </v-container>
    </v-main>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
</script>