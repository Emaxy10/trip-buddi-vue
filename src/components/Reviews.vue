<template>
  <v-list>
    <v-list-item v-for="(review, index) in reviews"
      :key="index"
    >
    <v-card
      class="mx-auto"
      max-width="344"
      max-height="250"
      hover
      
    >
      <v-card-item>
        <v-card-text>
          Location
        </v-card-text>
        <v-card-title
           class="text-orange-accent-4"
        >
        {{ review.place.name }}
        </v-card-title>
      </v-card-item>

      <v-card-item>
      <v-card-text>
        Ratings: 
      </v-card-text>
        <v-rating
          v-model="review.rating"
          active-color="blue"
          size="x-small"
          color="orange-lighten-1"
          readonly
        ></v-rating>
      </v-card-item>
  
      <v-card-text>
          Comment: 
        </v-card-text>
      <v-card-text class="text-orange-accent-4">
        
        {{ review.comment }}
      </v-card-text>
    </v-card>
  </v-list-item>
  </v-list>
  </template>

<script setup>
      import { ref, onMounted} from 'vue'
      import { useAuthStore } from '@/stores/auth'
      import api from '@/api/axios.js' // adjust to your actual Axios instance
      
      
      
      const authStore = useAuthStore()
      const user_id = ref(authStore.user?.id)
      const reviews = ref([])

      onMounted(async() => {
    try{

        const response = await api.get(`/places/${user_id.value}/reviews`)
        reviews.value = response.data
        console.log(response.data);
    }catch(error){

    }
  })
</script>