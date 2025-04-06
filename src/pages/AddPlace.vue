<template>
    <v-sheet class="mx-auto" max-width="500">
        <v-form @submit.prevent="handleSubmit">
            <v-text-field
                label="Name of place"
                type="text"
                v-model="place.name"
            ></v-text-field>

            <v-textarea
                label="Description"
                type="text"
                v-model="place.description"
            ></v-textarea>

            <v-text-field
                label="Address"
                type="text"
                v-model="place.address"
            ></v-text-field>

            <v-select
                label="Select"
                :items="['Hangout', 'Hotel', 
                'Motel', 'Resturant',
                 'Tourist Attractions',
                 ' Shopping', 'Culture & History']"
                 v-model="place.category"
            ></v-select>

            <v-btn
                :loading="loading"
                class="mt-2"
                text="Submit"
                type="submit"
                size="large"
                elevation="24"
                color="blue"
                block
            ></v-btn>
        </v-form>
    </v-sheet>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';

const place = ref({
    name:'',
    description:'',
    category:'',
    address:'',

})
const handleSubmit = async() =>{
    const newPlace ={
        name: place.value.name,
        description: place.value.description,
        address: place.value.address,
        category:place.value.category,
        rating: 0
    }
    console.log(newPlace)
}
</script>