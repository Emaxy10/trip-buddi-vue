<template>
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

            <v-file-input
                v-model="place.image"
                label="Upload Image"
                accept="image/png, image/jpeg"
                :error-messages=" v$.image.$errors.map(e => e.$message)"
                @blur="v$.image.$touch"
                @change="v$.image.$touch"
                required
            ></v-file-input>

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
    </v-sheet>
</template>
<script setup>
import axios from 'axios';
import { ref, reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
 import { required,  minLength, maxLength, helpers } from '@vuelidate/validators'

const place = ref({
    name:'',
    description:'',
    category:'',
    address:'',
    image:null

})


const fileSizeLimit = helpers.withMessage(
  'File must be less than 2MB',
  value => !value || (value.size && value.size < 2 * 1024 * 1024)
);

const allowedImageTypes = helpers.withMessage(
  'Only PNG and JPEG files are allowed',
  value =>
    !value || ['image/png', 'image/jpeg'].includes(value.type)
)

const loading = ref(false);
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
        },
        image: {
            required: helpers.withMessage('Image is required', required),
            fileSizeLimit,
            allowedImageTypes,
        }
    }
})

const v$ = useVuelidate(rules, place)


const handleSubmit = async() =>{
    loading.value = true;
    try{
  
    //Validate
    const isValid = await v$.value.$validate();
    if(!isValid){
        loading.value = false
        return
    }
    const newPlace ={
        name: place.value.name,
        description: place.value.description,
        address: place.value.address,
        category:place.value.category,
        rating: 0,
        image:place.value.image
    }
    console.log(newPlace)
    }catch(error){
        console.error("An error occured", error)
    }finally{
        loading.value = false;
    }
}
</script>