<template>
  <h2>Users</h2>
    <div>
       <UserList :users="users" :loading="loading"/>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api/axios';
import UserList from '@/components/UserList.vue';

const users = ref([]);
const snackbar = ref(false);
const loading = ref(false);
const search = ref('');

onMounted(async () => {
  try {
    const response = await api.get('/users');
    users.value = response.data;
  } catch (error) {
    console.error('An error occurred:',  error.response?.data ?? error.message);
  }
});


</script>
