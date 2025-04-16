<template>
  <v-container>
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
  </v-card>

  <v-row>
    <v-col cols="">
      <v-card
      class="mx-auto"
   
      width="800"
      >
        <v-list>
          <v-list-subheader>{{ place.name }}</v-list-subheader>
          <v-list-item
            subtitle="About us"
          >{{ place.description }}</v-list-item>
          <v-list-item
            subtitle="Category"
          >{{ place.category }}</v-list-item>
          <v-list-item
            subtitle="Rating"
          >
          <v-rating
          v-model="place.rating"
          active-color="blue"
          color="orange-lighten-1"
          readonly
        ></v-rating>

          </v-list-item>

       


        </v-list>
        
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script setup>
  import axios from 'axios';
  import {ref, onMounted} from 'vue'
  import { RouterLink } from 'vue-router';
  import { useRoute} from 'vue-router';


  const route = useRoute();

 const placeId = ref(route.params.id);

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