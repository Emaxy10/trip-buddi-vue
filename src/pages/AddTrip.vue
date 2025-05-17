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
        </div>
  
        <div class="form-group">
          <label for="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            v-model="trip.startDate"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            v-model="trip.endDate"
            required
          />
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
        </div>
  
        <button type="submit">Plan Trip</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import useVuelidate from '@vuelidate/core';
  
  const trip = ref({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1
  })
  
  const submitForm = () => {
    console.log('Trip planned:', trip.value)
    alert(`Trip to ${trip.value.destination} planned successfully!`)
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
  