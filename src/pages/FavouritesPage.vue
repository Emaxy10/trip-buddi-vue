<template>
    <p v-if="places.length === 0">No favourites found.</p>
<v-container 
style ='background-color: #0277BD;'
>
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
            
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
</v-container>
  </template>
  
  <script setup>
  import { ref, onMounted} from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import api from '@/api/axios.js' // adjust to your actual Axios instance
  
  
  
  const authStore = useAuthStore()
  const user_id = ref(authStore.user?.id)
  const user_roles = ref(authStore.user?.roles)
  const places = ref([])
  
  onMounted(async() => {
    try{

        const response = await api.get(`/places/${user_id.value}/favourite`)
        places.value = response.data
        //console.log(response.data);
    }catch(error){

    }
  })
  
  
  </script>
  