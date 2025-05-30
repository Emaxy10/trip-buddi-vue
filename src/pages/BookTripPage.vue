<template>
<v-container class="pa-4" max-width="600">
    <!-- Trip Details -->
    <v-card class="mb-6" outlined>
      <v-card-title>Trip Details</v-card-title>
      <v-card-text>
        <div><strong>Destination:</strong> {{ destination }}</div>
        <div><strong>Address:</strong> {{ address }}</div>
        <div class="mt-2">
          <!-- <strong>Passengers:</strong>
          <v-list dense>
            <v-list-item v-for="(passenger, i) in passengers" :key="i">
              <v-list-item-content>
                {{ passenger.name }} - {{ passenger.age }} yrs
              </v-list-item-content>
            </v-list-item>
          </v-list> -->
          <v-table dense outlined>
            <thead>
                <tr>
                    <th>Passenger Name</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(passenger, index) in passengers" :key="index">
                    <td>{{ passenger.name }}</td>
                    <td>{{ passenger.age }} yrs</td>
                </tr>
            </tbody>
          </v-table>
        </div>
      </v-card-text>
    </v-card>

    <!-- Payment Form -->
    <v-card outlined>
      <v-card-title>Payment Information</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handlePay">

          <v-text-field
            label="Cardholder Name"
            disabled
            outlined
            class="mb-4"
          />
          <v-text-field
            label="Card Number"
            disabled
            outlined
            class="mb-4"
          />
          <v-text-field
            label="Expiry Date"
            disabled
            outlined
            class="mb-4"
          />
          <v-text-field
            label="CVV"
            disabled
            outlined
            class="mb-4"
          />
          <v-btn type="submit" color="primary" class="mt-2" @click="handlePay">
            <v-icon left>mdi-cash</v-icon>
            Pay
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>

      <!-- Snackbar Confirmation -->
      <v-snackbar v-model="snackbar" color="blue-lighten-5" vertical>
      <div class="text-subtitle-1 pb-2">Proceed with this Action?</div>
      <template v-slot:actions>
        <v-btn class="mr-5" color="red-accent-4" variant="text" @click="snackbar = false">
          <v-icon left>mdi-close</v-icon>
          NO
        </v-btn>
        <v-btn class="mr-5" color="green-darken-4" variant="text" @click="confirmPayment">
          <v-icon left>mdi-check</v-icon>
          YES
        </v-btn>
      </template>
    </v-snackbar>

</template>

<script setup>
 import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';
import api from '@/api/axios';

const route = useRoute();
const router = useRouter();
const snackbar = ref(false);

const destination = ref(route.query.destination || '');
const address = ref(route.query.address || '');

const passengers = ref(JSON.parse(decodeURIComponent([route.query.passengers] || '[]')));
const destination_id = ref(route.query.id || '');
const startDate = ref(route.query.startDate || '');
const endDate = ref(route.query.endDate || '');

function handlePay() {
  snackbar.value = true
}

const confirmPayment= async() => {
  // Here you would typically handle the payment logic
  // For now, we just log the payment confirmation
try {
        // Simulate payment processing
      const formData = new FormData();
      formData.append('place_id', destination_id.value);
      formData.append('destination', destination.value);
      formData.append('start_date', startDate.value);
      formData.append('end_date', endDate.value);
      // Append passengers as an array of JSON strings
    passengers.value.forEach((passenger, index) => {
      formData.append(`passenger[${index}]`, JSON.stringify(passenger));
    });

      const response = await api.post('/trips/book', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });



      console.log('Payment confirmed for:', passengers.value);
      snackbar.value = false;
  } catch (error) {
    console.error('Payment processing failed:', error);
    snackbar.value = false;
    return;
  }
  
  
}


</script>