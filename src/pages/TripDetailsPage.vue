<template>
    <v-container class="py-6">
    <!-- Download Button -->
    <v-btn
      color="primary"
      class="mb-4"
     @click="downloadTicket"
      :loading="loading"
    >
      Download Ticket
    </v-btn>

    <!-- Ticket -->
    <div ref="ticketRef">
      <v-card elevation="6" class="rounded-xl pa-6" color="primary-lighten-5">
        <v-card-title class="text-h5 font-weight-bold">Trip Ticket</v-card-title>

        <v-divider class="my-4" />

        <v-row>
          <v-col cols="12" sm="6">
            <strong>Destination:</strong>
            <div>{{ destination }}</div>
          </v-col>

          <v-col cols="12" sm="6">
            <strong>Address:</strong>
            <div>{{ address }}</div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <strong>Start Date:</strong>
            <div>{{ startDate }}</div>
          </v-col>

          <v-col cols="12" sm="6">
            <strong>End Date:</strong>
            <div>{{ endDate }}</div>
          </v-col>
        </v-row>

        <v-divider class="my-4" />

        <v-card-subtitle class="mb-2 font-weight-medium">Passengers</v-card-subtitle>
        <v-list density="compact" class="bg-transparent">
          <v-list-item v-for="(passenger, index) in passengers" :key="index">
            <v-list-item-content>
              <v-list-item-title>{{ passenger.name }}</v-list-item-title>
              <v-list-item-subtitle v-if="passenger.age">Age: {{ passenger.age }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </v-container>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import html2pdf from 'html2pdf.js';


const route = useRoute();
const ticketRef = ref(null);

const passengers = ref(JSON.parse(decodeURIComponent(route.query.passengers || '[]')));
const destination = ref(route.query.destination || '');
const address = ref(route.query.address || '');
const startDate = ref(route.query.startDate || '');
const endDate = ref(route.query.endDate || '');
const loading = ref(false);


const downloadTicket = () => {
  if (!ticketRef.value) return;

  loading.value = true;

  const options = {
    margin: 0.3,
    filename: 'trip-ticket.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  html2pdf().set(options).from(ticketRef.value).save().finally(() => {
    loading.value = false;
  });
};
console.log('Passengers:', passengers.value);
</script>