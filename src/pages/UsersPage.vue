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
            <v-btn color="red" icon @click="snackbar = true ">
                <v-icon size="x-small">mdi-delete</v-icon>
            </v-btn>
        </td>

        <td>

          <v-btn color="blue" :to="'/users/edit/' + user?.id" icon>
              <v-icon size="x-small">mdi-pencil</v-icon>
          </v-btn>
        </td>

        <v-snackbar
      v-model="snackbar"
      color="blue-lighten-5"
      vertical
    >
      <div class="text-subtitle-1 pb-2">Proceed with this Action?</div>

      <template v-slot:actions>
        <v-btn
        class="mr-5"
          color="green-darken-4"
          variant="text"
          size="25"
          @click="snackbar = false "
        >
         NO
        </v-btn>
        
        <v-btn
        class="mr-5"
          color="red-accent-4"
          variant="text"
          size="25"
          @click="  deleteUser(user.id)"
        >
         YES
        </v-btn>
      </template>
    </v-snackbar>
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
    const snackbar = ref(false)
    

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