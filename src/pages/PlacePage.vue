<template>
    <v-card
    class="mx-auto"
   
    width="800"
  >
    <template v-slot:title>
      <span class="font-weight-black">{{place.name}}</span>
    </template>

    <v-img
            class="align-end text-white"
            height="200"
            :src="place.image" alt="Place Image"
            cover
        >
        </v-img>

    <v-card-text class="bg-surface-light pt-4">
      <v-row>
        <v-col cols="9">
          <v-sheet class="pa-2 ma-2">
            {{ place.description }}
          </v-sheet>
        </v-col>



      </v-row>

      <v-row>
        
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import axios from 'axios';
  import {ref, onMounted} from 'vue'
  import { RouterLink } from 'vue-router';
  import { useRoute} from 'vue-router';


  const route = useRoute();

 const placeId = ref([ route.params.id]);

 const place = ref({});

 onMounted(async() => {
    try{
        const response = await axios.get(`/api/places/${placeId.value}`)
        place.value = response.data
        console.log(place.value)
    }catch(error){
        console.error("Failed to get Data", error);
    }
})

</script>