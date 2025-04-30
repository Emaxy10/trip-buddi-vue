<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue'
import { useAuthStore } from '@/stores/auth'


// const places = async() =>{
//     try{
//         const response = await axios.get('/api/places')

//         return response.data
//     }catch(error){
//         console.error(error)
//     }
// }

const places = ref([])

onMounted(async() => {
    try{
        const response = await axios.get('/api/places')
        places.value = response.data
        console.log(places.value)
    }catch(error){
        console.error("Failed to get Data", error);
    }
})

const handleSubmit = async() =>{

}

</script>
<template>
<v-row>
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
            <v-form @submit.prevent="handleSubmit">
                <input
                    type="hidden"
                    :value="place?.id"
                ></input>


                <v-btn color="green-accent-3">Favourite +</v-btn>
            </v-form>
            
        </v-card-actions>
        </v-card>
    </v-col>
</v-row>
  </template>
