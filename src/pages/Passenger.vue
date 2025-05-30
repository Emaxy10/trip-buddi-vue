<template>
    <v-container >
      <v-row>
        <v-col cols="12">
          <h1 class="text-h5 font-weight-bold">Passenger Info</h1>
        </v-col>
      </v-row>
  
      <v-row v-if="count < 1" >
        <v-col cols="12">
          <v-alert type="error" prominent>
            This location cannot be found at the moment.
          </v-alert>
        </v-col>
      </v-row>
  
      <v-row v-else>
        <v-col cols="12">
            <v-card>
            <v-img
              class="bg-grey-lighten-2"
              max-height="125"
              :src="destination[0].image"
              cover
            ></v-img>
            <v-card-title class="text-h6">
              {{ destination[0].name }}
            </v-card-title>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="pa-4">
            <v-card-title>Passenger Registration</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="submitForm">
                <v-row
                  v-for="(passenger, index) in passengers"
                  :key="index"
                  class="mb-4"
                >
                  <v-col cols="12">
                    <h2 class="text-subtitle-1">Passenger {{ index + 1 }}</h2>
                  </v-col>
  
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="passenger.name"
                      label="Full Name"
                      outlined
                      required
                    />
                  </v-col>
  
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model.number="passenger.age"
                      label="Age"
                      type="number"
                      outlined
                      required
                    />
                  </v-col>
  
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="passenger.gender"
                      :items="['Male', 'Female', 'Other']"
                      label="Gender"
                      outlined
                      required
                    />
                  </v-col>
  
                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="error"
                      variant="text"
                      v-if="passengers.length > 1"
                      @click="removePassenger(index)"
                    >
                      Remove Passenger
                    </v-btn>
                  </v-col>
                </v-row>
  
                <v-btn color="primary" class="mr-2" @click="addPassenger">
                  Add Passenger
                </v-btn>
  
                <v-btn color="success" type="submit">
                  Submit
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import api from '@/api/axios'
  
  const route = useRoute()
  const router = useRouter()
  const destination = ref({})
  const count = ref(0)
  const tripInfo = ref(route.query || '')
  const loading = ref(false)
  
  const passengers = ref([
    { name: '', age: '', gender: '' }
  ])
  
  const addPassenger = () => {
    passengers.value.push({ name: '', age: '', gender: '' })
  }
  
  const removePassenger = (index) => {
    passengers.value.splice(index, 1)
  }
  
  const submitForm = () => {
    // console.log('Submitted passengers:', passengers.value)
    // alert('Passenger data submitted. Check console for output.')
    // console.log(destination.value[0].address)

    router.push({
      name: 'book-trip',
      query: {
        destination: tripInfo.value.destination,
        id:destination.value[0].id,
        address:destination.value[0].address,
        passengers: encodeURIComponent(JSON.stringify(passengers.value))
      }
    })
  }
  
  onMounted(async () => {
        
    try {
      const response = await api.get(`/places/search/${tripInfo.value.destination}`)
      destination.value = response.data
      count.value = response.data.length

    //   if(count.value < 1){
    //     loading.value = false
    //   }
      console.log( destination.value)
       
  
    } catch (error) {
      console.error('Failed to fetch destination:', error)
      count.value = 0
    }
  })
  </script>
  