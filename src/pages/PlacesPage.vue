<script setup>
import axios from 'axios';
import {ref} from 'vue'


const places = async() =>{
    try{
        const response = await axios.get('/api/places')

        return response.data
    }catch(error){
        console.error(error)
    }
}

console.log(places);
</script>
<template>

</template>
