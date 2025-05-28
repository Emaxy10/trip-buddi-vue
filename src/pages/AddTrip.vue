<template>
    <div class="trip-form-container">
      <h2>Trip Planner</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="destination">Destination</label>
          <input
            type="text"
            id="destination"
            v-model="trip.destination"
            placeholder="Enter a destination"
            required
          />
          <span v-if="v$.trip.destination.$error">Required</span>
        </div>
  
        <div class="form-group">
          <label for="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            v-model="trip.startDate"
            required
          />
          <span v-if="v$.trip.startDate.$error">
          {{ v$.trip.startDate.$errors[0].$message }}
        </span>
        </div>
  
        <div class="form-group">
          <label for="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            v-model="trip.endDate"
            required
          />
          <span v-if="v$.trip.endDate.$error">
          {{ v$.trip.endDate.$errors[0].$message }}
        </span>
        </div>
  
        <div class="form-group">
          <label for="travelers">Number of Travelers</label>
          <input
            type="number"
            id="travelers"
            v-model="trip.travelers"
            min="1"
            required
          />

          <span v-if="v$.trip.travelers.$error">Required</span>
        </div>
  
        <button type="submit" >Plan Trip</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import useVuelidate from '@vuelidate/core';
  import { useRouter } from 'vue-router';
  import { required, helpers }  from '@vuelidate/validators'


  const router = useRouter()
  
  const trip = ref({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: '',
  })

  // Define today's date (without time)
const today = new Date()
today.setHours(0, 0, 0, 0)

// Custom validator: date must not be in the past

const notPastDate = helpers.withMessage(
    'Date must not be in the past',
    (value) => {
      if(!value) return false
      const inputDate = new Date(value)
      inputDate.setHours(0,0,0,0)
      return inputDate >= today
    }
)

// Custom validator: endDate must be after startDate
const endDateAfterStartDate = helpers.withMessage(
  'End date must be after start date',
  function(value, vm){
    if(!value || !vm.trip.value.startDate) return false
    // return new Date(value) >= new Date(vm.trip.startDate)
    console.log(vm.trip.startDate)
  }
)
const rules = computed(() => ({
  trip: {
    destination: { required },
    startDate: {
      required,
      notPastDate,
    },
    endDate: {
      required,
      notPastDate,
    },
    travelers: { required },
  },
}))

const v$ = useVuelidate(rules,  {trip} )


  const submitForm = async() => {
    

    try{
         //Validate
        const isValid = await v$.value.$validate();
        if(!isValid){ 
            return
        }
        console.log('Trip planned:', trip.value)
        router.push({ name:"passenger", query:{q: trip.value}});

      
       


    }catch(error){
      console.error(error)
    }
   
  }
  </script>
  
  <style scoped>
  .trip-form-container {
    max-width: 400px;
    margin: auto;
    padding: 2rem;
    background: black;
    border-radius: 12px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
    font-family: sans-serif;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  
  button {
    width: 100%;
    padding: 0.75rem;
    background-color: #1d4ed8;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2563eb;
  }
  </style>
  