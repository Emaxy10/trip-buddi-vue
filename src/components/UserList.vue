<template>
    <v-container fluid>
      <!-- Search Bar -->
      <v-row justify="end" class="mb-4">
        <v-col cols="12" sm="4" md="3">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search places"
            hide-details
            single-line
            dense
            outlined
            @keyup.enter="performSearch"
          />
        </v-col>
      </v-row>
  
      <!-- Users Table -->
      <v-row>
        <v-col cols="12">
          <v-table dense outlined>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Email</th>
                <th class="text-left">Roles</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <v-chip
                    v-for="role in user.roles"
                    :key="role.id"
                    class="ma-1"
                    color="primary"
                    small
                    text-color="white"
                    closable
                    @click:close="removeRole(role.id, user.id)"
                  >
                    {{ role.name }}
                  </v-chip>
                </td>
                <td>
                  <v-btn icon color="blue" :to="'/users/edit/' + user.id" class="mr-2">
                    <v-icon size="x-small">mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon color="red" @click="openDeleteDialog(user.id)">
                    <v-icon size="x-small">mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
  
      <!-- Snackbar Confirmation -->
      <v-snackbar v-model="snackbar" color="blue-lighten-5" vertical>
        <div class="text-subtitle-1 pb-2">Proceed with this Action?</div>
        <template v-slot:actions>
          <v-btn class="mr-5" color="green-darken-4" variant="text" @click="snackbar = false">
            NO
          </v-btn>
          <v-btn class="mr-5" color="red-accent-4" variant="text" @click="confirmDelete">
            YES
          </v-btn>
        </template>
      </v-snackbar>
  
      <!-- Loader -->
      <v-overlay :model-value="localLoading" class="d-flex justify-center align-center" persistent>
        <v-progress-linear v-if="loading" height="25" color="amber" indeterminate />
      </v-overlay>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import api from '@/api/axios';
  

  const props = defineProps({
    users: Array,
    loading:{
        type: Object,
        default: () =>({}),
    },
  })

  const users = ref([...props.users])

    watch(() => props.users, (newVal) => {
        users.value = [...newVal]
    })


 // const users = ref([]);
  const snackbar = ref(false);
  const userToDelete = ref(null);
  const search = ref('');
  const localLoading = ref(false);
  const router = useRouter();
  const authStore = useAuthStore();
  
//   onMounted(async () => {
//     try {
//       const response = await api.get('/users');
//       users.value = response.data;
//     } catch (error) {
//       console.error('An error occurred:', error);
//     }
//   });
  
  const openDeleteDialog = (userId) => {
    userToDelete.value = userId;
    snackbar.value = true;
  };
  
  const confirmDelete = async () => {
    if (!userToDelete.value) return;
  
    localLoading.value  = true;
    snackbar.value = false;
  
    try {
      await api.delete(`/users/${userToDelete.value}`);
      // Refresh data after deletion
      const response = await api.get('/users');
      users.value = response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
        localLoading.value = false;
    }
  };
  
  const removeRole = async (roleId, userId) => {
    try {
      const response = await api.delete(`/users/role/remove/${userId}`, {
        data: { role: roleId },
      });
      console.log('Role removed:', response.data);
  
      // Optionally refresh the user list
      const refreshed = await api.get('/users');
      users.value = refreshed.data;
    } catch (error) {
      console.error('Error removing role:', error.response?.data || error.message);
    }
  };
  
  const performSearch = () =>{
    if (!search.value.trim()) return;
  
      try{
          router.push({ name: 'search_results', query: { q: search.value , type: 'user'} });
      }catch(error){
          console.error('Search failed:', error);
      }
  
  }
  </script>
  