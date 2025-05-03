<script setup>
//Put an error message if user alreadi have place as favourite
import axios from 'axios';
import {ref, onMounted} from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/api/axios';


const places = ref([])
const authStore = useAuthStore()

const loading = ref({})

//Alert
const success = ref(false)
const successMessage = ref('')

const failure = ref(false)
const failureMessage = ref('')




onMounted(async() => {
    try{
        const response = await axios.get('/api/places')
        places.value = response.data
        console.log(places.value)
    }catch(error){
        console.error("Failed to get Data", error);
    }
})

const handleSubmit = async(placeId) =>{
    loading.value[placeId] = true
   try{
        if(authStore.accessToken){
            const userId = authStore.user?.id

            const formData = new FormData()

            formData.append('user_id', userId )
            formData.append('place_id', placeId )

            const response = await api.post(`/places/favourite`, formData);

         

            if(response.data  && response.data.message === 'Already a favourite' ){
                failure.value = true
                 
                 failureMessage.value = "Alreadi a favourite "
            }else{
                successMessage.value = 'Added to favourites!'
                success.value = true
            }
        }
   }catch(error){
    faliure.value = true;
    failureMessage.value = "An error occured"
    console.error(error)
   }finally{
    loading.value[placeId] = false
   }
   
//   console.log('Submitted place ID:', placeId)
}

</script>
<template>
<v-row>
    <v-col>
        
    </v-col>
</v-row>
<v-row>
    <v-snackbar
  v-model="success"
  color="green"
  timeout="3000"
  top
>
  {{ successMessage }}
</v-snackbar>

<v-snackbar
  v-model="failure"
  color="red"
  timeout="3000"
  top
>
  {{ failureMessage }}
</v-snackbar>


    <v-col
        v-for="(place, index) in places"
        :key="index"
        cols="12"
        sm="6"
        md="4"
    >
        <v-card
        class="mx-auto"
        max-width="300"
        >
        <v-img
            class="align-end text-white"
            height="200"
            :src="place.image" alt="Place Image"
            cover
        >
            <v-card-title>{{ place.name }}</v-card-title>
        </v-img>
    
        <v-card-subtitle class="pt-4">
            {{ place.category }}
        </v-card-subtitle>
    
        <v-card-text>
            <div>{{  place.description }}</div>
        </v-card-text>
    
        <v-card-actions>
            <v-btn color="orange" text="Edit" :to="'/place/edit/' + place?.id"></v-btn>
    
            <v-btn color="blue-grey-lighten-1" text="More" :to="'/place/' + place?.id"></v-btn>
                <v-btn
                :loading="loading[place.id]"
                :disabled="loading[place.id]"
                  @click="handleSubmit(place.id)"
                color="green-accent-3"
                type="submit">Favourite +</v-btn>
          

            
        </v-card-actions>
        </v-card>
    </v-col>
</v-row>
  </template>
