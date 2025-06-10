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
              :src="trip.destinationImage"
              height="200px"
              cover
            ></v-img>
  
            <v-card-title class="text-h6">
              {{ trip.destinationName }}
            </v-card-title>
  
            <v-card-subtitle class="text-subtitle-1">
              Passenger: {{ trip.passengerName }}
            </v-card-subtitle>
  
            <v-card-text>
              <div class="mb-2">
                <v-icon icon="mdi-map-marker" class="mr-1" />
                {{ trip.address }}
              </div>
              <div>
                <v-icon icon="mdi-calendar-start" class="mr-1" />
                Start Date: {{ trip.startDate }}
              </div>
              <div>
                <v-icon icon="mdi-calendar-end" class="mr-1" />
                End Date: {{ trip.endDate }}
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
  const trips = [
    {
      passengerName: 'Emmanuel Iroawula',
      destinationName: 'Obudu Mountain Resort',
      address: 'Obanliku, Cross River, Nigeria',
      destinationImage: 'https://example.com/obudu-resort.jpg',
      startDate: '2025-06-15',
      endDate: '2025-06-20'
    },
    {
      passengerName: 'Tochukwu Iroawula',
      destinationName: 'Obudu Mountain Resort',
      address: 'Obanliku, Cross River, Nigeria',
      destinationImage: 'https://example.com/obudu-resort.jpg',
      startDate: '2025-06-15',
      endDate: '2025-06-20'
    }
  ]
  </script>
  
  <style scoped>
  .v-card-text div {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }
  </style>
  