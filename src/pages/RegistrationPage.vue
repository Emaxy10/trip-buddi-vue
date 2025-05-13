<template>
<v-container >
    <h2 class="ma-4"> Register for Trip Buddi</h2>
    <v-form @submit.prevent="handleSubmit">
      <v-text-field
        v-model="form.username"
        label="Name"
    
        required
      ></v-text-field>

      <div v-if="isSubmitted && v$.username.$error">
          <span class="text-danger" v-if="v$.username.required.$invalid"> Username is required</span>
        </div>

      <v-text-field
        v-model="form.userEmail"
        type="email"
        label="Email"

        required
      ></v-text-field>


      <div v-if="isSubmitted && v$.userEmail.$error">
          <span class="text-danger" v-if="v$.userEmail.required.$invalid"> Email is required</span><br>
          <span class="text-danger" v-if="v$.userEmail.emailIsValid.$invalid"> {{ v$.userEmail.emailIsValid.$message }}</span>
      </div>

      <v-text-field
        v-model="form.password"
        label="Password"
        type="password"
  
        required
          @input="v$.password.$touch"
      ></v-text-field>

      <div v-if="isSubmitted && v$.password.$error">
          <span class="text-danger" v-if="v$.password.required.$invalid"> Password is required</span>
          <span class="text-danger" v-if="v$.password.minLength.$invalid"> Password be at least 8 characters</span><br>
          <span class="text-danger" v-if="v$.password.containsNumber.$invalid"> {{ v$.password.containsNumber.$message }}</span><br>
          <span class="text-danger" v-if="v$.password.containsSpecialChar.$invalid">{{ v$.password.containsSpecialChar.$message }}</span><br>
          <span class="text-danger" v-if="v$.password.containsCapitalLetter.$invalid"> {{ v$.password.containsCapitalLetter.$message }}</span><br>
      </div>

      <v-text-field
        v-model="form.confirmPassword"
        label="Confirm Password"
        type="password"
 
        required
        @input="v$.confirmPassword.$touch"
      ></v-text-field>

      <div v-if="isSubmitted && v$.confirmPassword.$error">
          <span class="text-danger" v-if="v$.confirmPassword.required.$invalid"> confirm password is required</span><br>
          <span class="text-danger" v-if="v$.confirmPassword.sameAsPassword.$invalid"> Password does not match</span>
      </div>

      <v-btn type="submit" color="primary" class="mt-4" >
        Register
      </v-btn>
    </v-form>
</v-container>
  </template>

  <script setup>
  import api from '@/api/axios';
  import { ref } from 'vue';
  import useVuelidate from '@vuelidate/core';
 import { required,  minLength, maxLength, helpers, email } from '@vuelidate/validators'
import axios from 'axios';
import { useRouter } from 'vue-router'

  const router = useRouter()


    // Custom validators
    const containsSpecialChar = (value) => /[!@#$%^&*()\-_=+{};:,<.>]/.test(value);
    const containsNumber = (value) => /\d/.test(value);
    const containsCapitalLetter = (value) => /[A-Z]/.test(value);
    const emailIsValid = (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

    const passwordMatch = () => {
        const password = form.value.password;
        const confirm_pass = form.value.confirmPassword;

        return confirm_pass === password
    }

    
     //set validation rules

     const rules = computed(() => {
        return{
            username: {required},

            userEmail: {required, email,
                emailIsValid: helpers.withMessage(
                    'Please use a valid email.',
                    emailIsValid
                ),
            },
            password: {required, minLength: minLength(8),
                containsSpecialChar: helpers.withMessage(
                'Password must contain at least one special character.',
                containsSpecialChar
            ), containsNumber: helpers.withMessage(
                'Password must contain at least one number.',
                containsNumber
            ),
            containsCapitalLetter: helpers.withMessage(
                'Password must contain at least one capital letter.',
                containsCapitalLetter
            ),
            },
            confirmPassword:{required,
                 sameAsPassword: helpers.withMessage(
                    'Passwords do no match,',
                    passwordMatch
                 )}
        };  
       
    });


   



  const form = ref({
   username: '',
  userEmail: '', 
  password: '',
  confirmPassword: ''
})

  //initialize vuelidate
  const v$ = useVuelidate(rules, form)

   // Track if the form has been submitted
   const isSubmitted = ref(false);


const handleSubmit = async() =>{
     // Mark the form as submitted
     isSubmitted.value = true;

       // Validate form
       const isValid = await v$.value.$validate();
        if(!isValid){
            console.error('Validation error', v$.value.$errors);
            return;
        }

        const formData = new FormData()
        formData.append('name', form.value.username )
        formData.append('email', form.value.userEmail)
        formData.append('password', form.value.password)

        const response = await axios.post('/api/register', formData);
        
        console.log(response.data)
        router.push('/login');

}
   
  </script>