<script setup>
//Put an error message if user alreadi have place as favourite
import axios from 'axios';
import {ref, onMounted} from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/api/axios';
import { useRouter } from 'vue-router'
const searchQuery = ref('');

const router = useRouter()


const places = ref([])
const authStore = useAuthStore()

const loading = ref(false)

//Alert
const success = ref(false)
const successMessage = ref('')

const failure = ref(false)
const failureMessage = ref('')

const user_roles = ref(authStore.user?.roles)

console.log(authStore.user)



onMounted(async() => {
    loading.value = true
    try{
        const response = await axios.get('/api/places')
        places.value = response.data
        console.log(places.value)
    }catch(error){
        loading.value = false
        console.error("Failed to get Data", error);
    }finally{
        loading.value = false
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
    failure.value = true;
    failureMessage.value = "An error occured"
    console.error(error)
   }finally{
    loading.value[placeId] = false
   }
   
//   console.log('Submitted place ID:', placeId)
}

const bookPassenger = (place_name) =>{
    router.push({ name:'add-trip', query:{
         place_name
    }})
}
const deletePlace = async(placeId) =>{
    
}

const performSearch = async() => {
    if (!searchQuery.value.trim()) return;

    try{
        router.push({ name: 'search_results', query: { q: searchQuery.value, type: 'place' } });
    }catch(error){
        console.error('Search failed:', error);
    }

    console.log("Search button was clicked", searchQuery.value)
}

</script>
<template>
   <!-- Search -->
<v-row class="justify-end">
    <v-col 
    cols="6"
     v-if="user_roles?.some(role => role.name === 'admin' || role.name === 'manager')"
     
     >
        
        <v-btn
         color="blue-grey-lighten-1"
         rounded="lg" size="large" 
         :to ="'/place/add'"
         :loading="loading"
         :disabled="loading"
        >Add Place</v-btn>
    
    </v-col>
    <v-col  cols="6" sm="4">
        <v-text-field
      v-model="searchQuery"
      append-icon="mdi-magnify"
      label="Search places"
      hide-details
      single-line
      dense
      outlined
      style="max-width: 250px;"
      @keyup.enter="performSearch"
    ></v-text-field>
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
    
        <!-- <v-card-actions v-if="user_roles">
            <div v-if="user_roles?.some(role => role.name == 'admin')">
            <v-btn     
                color="orange" text="Edit" :to="'/place/edit/' + place?.id"></v-btn>

                <v-btn     
                color="red" text="Delete" :to="'/place/edit/' + place?.id"></v-btn>
            </div>

            <div v-else  v-if="!user_roles">
                <v-btn
                 color="orange" 
                 text="Book"
                ></v-btn>

                
                <v-btn
                :loading="loading[place.id]"
                :disabled="loading[place.id]"
                  @click="handleSubmit(place.id)"
                color="green-accent-3"
                type="submit">Favourite +</v-btn>
            </div>

            <v-btn
             v-if="!user_roles"
             color="blue-grey-lighten-1" text="More" :to="'/place/' + place?.id"></v-btn>
    

          

            
        </v-card-actions> -->

        <v-card-actions>
            <template v-if="user_roles?.some(role => role.name === 'admin')">
                <v-btn color="orange" text="Edit" :to="'/place/edit/' + place.id"></v-btn>
                <v-btn color="red" text="Delete" :to="'/place/edit/' + place.id"></v-btn>
            </template>

            <template v-else-if="user_roles">
               
                <v-btn
                :loading="loading[place.id]"
                :disabled="loading[place.id]"
                @click="handleSubmit(place.id)"
                color="green-accent-3"
                type="submit"
                >
                Favourite +
                </v-btn>
                
            </template>
            <v-btn color="orange" text="Book" @click='bookPassenger(place.name)'></v-btn>
            <v-btn color="blue-grey-lighten-1" text="More" :to="'/place/' + place.id"></v-btn>
        </v-card-actions>


        </v-card>
    </v-col>
</v-row>
  </template>
