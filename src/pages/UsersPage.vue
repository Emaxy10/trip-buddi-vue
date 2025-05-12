<template>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Email
          </th>
          <th class="text-left">
            Roles
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
       <tr
       v-for="(user, index) in users"
       :key="index"
       >
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>
            <v-chip
                v-for="(role, rIndex) in user.roles"
                :key="rIndex"
                class="ma-1"
                color="primary"
                small
                text-color="white"
            >
                {{ role }}
            </v-chip>
        </td>

        <!-- <td>
            <ul>
                <li v-for="(role, rIndex) in user.roles" :key="rIndex">{{ role }}</li>
            </ul>
        </td> -->


        <td>
            <v-btn color="red" icon @click="deleteUser(user.id)">
                <v-icon size="x-small">mdi-delete</v-icon>
            </v-btn>
        </td>

        <td>

          <v-btn color="blue" icon>
              <v-icon size="x-small">mdi-pencil</v-icon>
          </v-btn>
        </td>
       </tr>
      </tbody>
    </v-table>
        <!-- Show loader when loading is true -->
        <v-overlay v-model="loading" class="d-flex justify-center align-center" persistent>
                    <v-progress-linear
                    v-if="loading"
                     height="25"
                    color="amber"
                    indeterminate
                    ></v-progress-linear>
                </v-overlay>
  </template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useAuthStore } from '@/stores/auth';
    import api from '@/api/axios';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const loading = ref(false);
    

    const users = ref([])
    
    const authStore = useAuthStore();

    onMounted(async() => {
        try{
            const response = await api.get('/users');
            users.value = response.data

            console.log(response.data)
        }catch(error){
            console.error("an error occured", error)
        }
    })

    const deleteUser = async(userID) =>{
          loading.value = true
      try{
        const response = await api.delete(`/users/${userID}`)
        router.go();
      }catch(error){
        console.error(error);
      }finally{
        loading.value = false
      }
    }
</script>