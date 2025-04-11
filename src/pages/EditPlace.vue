<template>
     <h2 class="ma-4"> Edit Place</h2>
    <v-sheet class="mx-auto" max-width="500">
        
        <v-form @submit.prevent="handleSubmit">
            <v-text-field
                label="Name of place"
                type="text"
                :error-messages="v$.name.$errors.map(e => e.$message)"
                v-model="place.name"
            ></v-text-field>

            <v-textarea
                label="Description"
                type="text"
                :error-messages="v$.description.$errors.map(e => e.$message)"
                v-model="place.description"
            ></v-textarea>

            <v-text-field
                label="Address"
                type="text"
                :error-messages="v$.address.$errors.map(e => e.$message)"
                v-model="place.address"
            ></v-text-field>

            <v-select
                label="Select"
                :items="['Hangout', 'Hotel', 
                'Motel', 'Resturant',
                 'Tourist Attractions',
                 ' Shopping', 'Culture & History']"
                 :error-messages="v$.category.$errors.map(e => e.$message)"
                 v-model="place.category"
            ></v-select>

            <v-btn
                :loading="loading"
                class="mt-2"
                type="submit"
                size="large"
                elevation="24"
                color="blue"
                block
            >
            Submit
        </v-btn>
        </v-form>

        <v-snackbar v-model="snackbar" :timeout="3000" color="green">
        {{ snackbarMessage }}
    </v-snackbar>
    </v-sheet>
</template>

<script setup>
import axios from 'axios';
import router from '@/router';
import { ref, reactive, computed, onMounted } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required,  minLength, maxLength, helpers } from '@vuelidate/validators'
import { useRoute} from 'vue-router';


const route = useRoute();

 const placeId = ref([ route.params.id]);

 const loading = ref(false);

 const snackbar = ref(false)
const snackbarMessage = ref('') //snackbar for alert

 //console.log(placeId)

 const place = ref({
    name:'',
    description:'',
    category:'',
    address:''

})

//Validate user input
const rules = computed(() =>{
    return {
        name: {required,
             minLength: minLength(2),
             maxLength: maxLength(30)
            },
        description: {required,
            minLength: minLength(10),
            maxLength: maxLength(150)
        },
        category: {required},
        address: {required,
            maxLength: maxLength(150)
        }
    }
})

const v$ = useVuelidate(rules, place)

onMounted( async() => {
    try{
        const response = await axios.get(`/api/places/${placeId.value}`)
        place.value = response.data;
        

    }catch(error){
        console.error(error);
    }
})

 const handleSubmit = async()=>{
    loading.value = true;
      // Validate Form
      const isValid = await v$.value.$validate();
        if (!isValid){
            console.error('Validation failed', error);
            return;
        }

        const updatePlace = {
            name:place.value.name,
            description:place.value.description,
            category:place.value.category,
            address:place.value.address
        }
        
        try{
            const reponse = await axios.put(`/api/places/${placeId.value}`,updatePlace)

                    // Show success message
            snackbarMessage.value = 'Place Updated successfully!'
            snackbar.value = true

            
        }catch(error){
            console.error(error)
        }finally{
            loading.value = false;
            router.push('/place')
        }
        
 }
</script>