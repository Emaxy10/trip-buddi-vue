<template>
      <h2>Search results for "{{ searchTerm }}"</h2>
      <div>
        <PlaceCardList :places="places" :loading="loading" />
        <v-spinner v-if="loading" />
      </div>
  </template>

<script setup>

import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import api from '@/api/axios';
  import PlaceCardList from '@/components/PlaceCardList.vue'
  
  const route = useRoute();
  const searchTerm = ref(route.query.q || '');
  const places = ref([]);
  const loading = ref({})

  onMounted( async() =>{
    if (searchTerm.value) {
        const response = await api.get(`/places/search/${searchTerm.value}`)
        places.value = response.data
        
    }
  })
</script>