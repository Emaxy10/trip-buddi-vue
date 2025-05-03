<template>
    <v-row>
      <v-col
        v-for="(place, index) in places"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="mx-auto" max-width="300">
          <v-img
            class="align-end text-white"
            height="200"
            :src="place.image"
            alt="Place Image"
            cover
          >
            <v-card-title>{{ place.name }}</v-card-title>
          </v-img>
  
          <v-card-subtitle class="pt-4">
            {{ place.category }}
          </v-card-subtitle>
  
          <v-card-text>
            <div>{{ place.description }}</div>
          </v-card-text>
  
          <v-card-actions>
            <div v-if="user_roles.some(role => role.name == 'admin')">
            <v-btn     
                color="orange" text="Edit" :to="'/place/edit/' + place?.id"></v-btn>
            </div>

            <div v-else>
                <v-btn
                 color="orange" 
                 text="Book"
                ></v-btn>
            </div>
            <v-btn
              v-else
              color="orange"
              text="Book"
            >

            </v-btn>
            <v-btn
              color="blue-grey-lighten-1"
              text="More"
              :to="'/place/' + place?.id"
            />
            <v-btn
              :loading="loading[place.id]"
              :disabled="loading[place.id]"
              @click="handleSubmit(place.id)"
              color="green-accent-3"
              type="submit"
            >
              Favourite +
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  
    <v-snackbar v-model="success" color="green" timeout="3000">
      {{ successMessage }}
    </v-snackbar>
  
    <v-snackbar v-model="failure" color="red" timeout="3000">
      {{ failureMessage }}
    </v-snackbar>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import api from '@/api/axios.js' // adjust to your actual Axios instance
  
  const props = defineProps({
    places: Array,
    loading: {
      type: Object,
      default: () => ({}),
    },
  })
  
  const authStore = useAuthStore()
  const user_roles = ref(authStore.user?.roles)
  
  const success = ref(false)
  const failure = ref(false)
  const successMessage = ref('')
  const failureMessage = ref('')
  
  const handleSubmit = async (placeId) => {
    props.loading[placeId] = true
    try {
      if (authStore.accessToken) {
        const userId = authStore.user?.id
        const formData = new FormData()
        formData.append('user_id', userId)
        formData.append('place_id', placeId)
  
        const response = await api.post(`/places/favourite`, formData)
  
        if (response.data && response.data.message === 'Already a favourite') {
          failure.value = true
          failureMessage.value = 'Already a favourite'
        } else {
          success.value = true
          successMessage.value = 'Added to favourites!'
        }
      }
    } catch (error) {
      failure.value = true
      failureMessage.value = 'An error occurred'
      console.error(error)
    } finally {
      props.loading[placeId] = false
    }
  }
  </script>
  