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
          <v-btn type="submit" color="primary" class="mt-2">
            Pay
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
 import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();

const destination = ref(route.query.destination || '');
const address = ref(route.query.address || '');

const passengers = ref(JSON.parse(decodeURIComponent(route.query.passengers || '[]')));
const destination_id = ref(route.query.id || '');

function handlePay() {
  alert('Payment submitted (form inputs are disabled).')
}


</script>