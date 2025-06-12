<template>
    <v-container>
      <v-row dense>
        <v-col
          v-for="(trip, index) in trips"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="mx-auto my-4" elevation="4">
            <v-img
              :src="trip.place?.image"
              height="200px"
              cover
            ></v-img>
  
            <v-card-title class="text-h6">
              {{ trip.place?.name }}
            </v-card-title>
  
            <v-card-subtitle class="text-subtitle-1">
              Passengers:
                <ul>
                 <li v-for="passenger in trip.passengers" :key="passenger">{{ passenger }}</li>
                </ul>
            </v-card-subtitle>
  
            <v-card-text>
              <div class="mb-2">
                <v-icon icon="mdi-map-marker" class="mr-1" />
                {{ trip.place?.address }}
              </div>
              <div>
                <v-icon icon="mdi-calendar-start" class="mr-1" />
                Start Date: {{ trip.start_date }}
              </div>
              <div>
                <v-icon icon="mdi-calendar-end" class="mr-1" />
                End Date: {{ trip.end_date }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted} from 'vue'
  import api from '@/api/axios';
  import { useAuthStore } from '@/stores/auth';

  const trips = ref([])

  const authStore = useAuthStore();

  const user_id = ref(authStore.user?.id)



  
  onMounted( async()=>{

    const response = await api.get(`/trips/user/${user_id.value}`)
    const rawTrips = response.data.trips;

     const groupedTrips = [];

        rawTrips.forEach(trip => {
        const existingTrip = groupedTrips.find(t =>
          t.place_id === trip.place_id &&
          t.destination === trip.destination &&
          t.start_date === trip.start_date &&
          t.end_date === trip.end_date
        );

        if (existingTrip) {
          existingTrip.passengers.push(trip.passenger_name);
        } else {
          groupedTrips.push({
            place_id: trip.place_id,
            destination: trip.destination,
            start_date: trip.start_date,
            end_date: trip.end_date,
            place: trip.place,
            passengers: [trip.passenger_name]
          });
        }
      });

      trips.value = groupedTrips;

      console.log(trips.value);
  })

  </script>
  
  <style scoped>
  .v-card-text div {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }
  </style>
  