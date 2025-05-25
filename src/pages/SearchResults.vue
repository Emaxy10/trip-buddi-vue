<template>
      <h2>Search results for "{{ searchTerm }}"</h2>
      <div v-if="searchType ==='place'">
        <PlaceCardList :places="places" :loading="loading" />
        
      </div>

      <div v-else-if="searchType ==='user'">
        <!-- <h3>Users are here</h3>
        {{ users }} -->
        <UserList :users="users" :loading="loading"/>

      </div>

      <div>
        <v-spinner v-if="loading" />
      </div>

      
  </template>

<script setup>

import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import api from '@/api/axios';
  import PlaceCardList from '@/components/PlaceCardList.vue'
  import UserList from '@/components/UserList.vue';
  
  const route = useRoute();
  const searchTerm = ref(route.query.q || '');
  const searchType = ref(route.query.type)
  const places = ref([]);
  const users = ref([])
  const loading = ref({})

  onMounted( async() =>{
    if (searchType.value === 'place') {
        const response = await api.get(`/places/search/${searchTerm.value}`)
        places.value = response.data
        
    }else if(searchType.value === 'user'){
      const response = await api.get(`/users/search/${searchTerm.value}`)
      users.value = response.data
      console.log(users.value)
    }
    console.log(searchType.value);
  })
</script>