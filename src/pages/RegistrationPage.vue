<template>
<v-container >
    <h2 class="ma-4"> Register for Trip Buddi</h2>
    <form @submit.prevent="submit">
      <v-text-field
        v-model="form.firstName"
        label="First Name"
    
        required
      ></v-text-field>

      <v-text-field
        v-model="form.middleName"
        label="Middle Name (optional)"
      ></v-text-field>

      <v-text-field
        v-model="form.lastName"
        label="Last Name"
     
        required
      ></v-text-field>

      <v-text-field
        v-model="form.password"
        label="Password"
        type="password"
  
        required
      ></v-text-field>

      <v-text-field
        v-model="form.confirmPassword"
        label="Confirm Password"
        type="password"
 
        required
      ></v-text-field>

      <v-btn type="submit" color="primary" class="mt-4" >
        Register
      </v-btn>
    </form>
</v-container>
  </template>

  <script setup>
  const form = ref({
  firstName: '',
  middleName: '',
  lastName: '',
  password: '',
  confirmPassword: ''
})
   
  </script>