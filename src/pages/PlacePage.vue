<template>
  <v-container>
    <v-card
    class="mx-auto"
   
    width="800"
  >
    <template v-slot:title>
      <span class="font-weight-black">{{place.name}}</span>
      
    </template>
    <v-btn class="mt-2 mr-3 position-absolute top-0 right-0" text="Book" color="orange"></v-btn>

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
          v-model="rating.rating"
          active-color="blue"
          color="orange-lighten-1"
          readonly
        ></v-rating>
          </v-list-item>

          <v-list-subheader>Reviews</v-list-subheader>
          <v-list-item
            v-for="(review, index) in reviews"
            :key="index"
          >

              <v-list-item-title>{{ review.comment }}</v-list-item-title>
              <v-list-item-subtitle
                color="orange-lighten-1"
              >
                - {{ review.user?.name }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-rating
                  v-model="review.rating"
                  active-color="blue"
                  size="x-small"
                  color="orange-lighten-1"
                  readonly
                ></v-rating>
              </v-list-item-subtitle>
              
          </v-list-item>

        </v-list>
        
      </v-card>

      <v-card
      class="mx-auto"
      
      width="800"
      height="300"
      >
      <v-card-subtitle>Address: {{ place?.address }}</v-card-subtitle>
      <div id="map" class="w-full h-screen"></div>

      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
        <v-form @submit.prevent="handleSubmit">
           <v-sheet class="mx-auto" width="800">
            <div class="text-center">
             <h3 color="blue">Rate The Expirience -- </h3> <v-rating
                v-model="userReview.rating"
                active-color="blue"
                hover
              ></v-rating>
            </div>
                <v-textarea
                v-model="userReview.comment"
                 label="Leave a comment"></v-textarea>
             <v-btn class="mt-2" type="submit"
              color="blue"
              block
              size="large"
              elevation="24"
              >Comment
            
            </v-btn>
           </v-sheet>
        </v-form>
    </v-col>
  </v-row>
</v-container>
</template>

<script setup>
  import axios from 'axios';
  import {ref, onMounted} from 'vue'
  import { useRoute} from 'vue-router';
  import L from 'leaflet'
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router'

  const router = useRouter();

  const authStore = useAuthStore();

  const user_id = ref(authStore.user?.id)

  const geocodeAddress = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
  const { data } = await axios.get(url)
  if (data && data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    }
  }
  return null
}


  const route = useRoute();

 const placeId = ref(route.params.id);

 const place = ref({});

 const rating = ref({})

 const reviews = ref([]);

 const userReview = ref({
  rating:'',
  comment:''
 })

 onMounted(async() => {

        const map = L.map('map').setView([6.5244, 3.3792], 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map)

      
    try{
        const response = await axios.get(`/api/places/${placeId.value}`)
        place.value = response.data

        const coordinates = await geocodeAddress(place.value.address)

        if(coordinates){
          L.marker([coordinates.lat, coordinates.lng])
            .addTo(map)
            .bindPopup(`<strong>${place.value.name}</strong><br>${place.value.address}`)
        }

         //console.log(coordinates)

        const ratingResopnse = await axios.get(`/api/places/${placeId.value}/rating`)
        rating.value = ratingResopnse.data
        //console.log(rating.value);

        const reviewResponse = await axios.get(`/api/places/${placeId.value}/review`)
        reviews.value = reviewResponse.data

        //console.log(reviews.value)

    }catch(error){
        console.error("Failed to get Data", error);
    }
})

const handleSubmit = async() => {
      const review = {
        user_id : user_id.value,
        place_id: placeId.value,
        rating: userReview.value.rating,
        comment:userReview.value.comment
      }

      //console.log(review);
      try{
        const response = await axios.post(`/api/review`, review)
          console.timeStamp(response.data)

          router.push("/place")
          
      }catch(error){
        console.error("An error occured", error)
      }
      
}

</script>