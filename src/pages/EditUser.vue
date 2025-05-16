<template>
<v-form @submit.prevent="handleSubmit">
    <v-select
    v-model="role"
  label="Select Role"
  :items="roles"
  item-title="name"
  item-value="id"
    ></v-select>

    <v-btn rounded="sm"  type="submit" size="x-large" 
    :loading="loading"
    :disabled="loading"
    block>Assign Role</v-btn>
    
</v-form>

</template>

<script setup>
    import { useAuthStore } from '@/stores/auth';
    import { useRoute, useRouter} from 'vue-router';
    import api from '@/api/axios';
    import { ref, onMounted, shallowRef } from 'vue';


    const route = useRoute();
    const router = useRouter();
    const loading = ref(false);

    const role = shallowRef('');

    const userId = ref(route.params.id)

    const roles = ref([]);

    onMounted( async() => {
        try{
            const response = await api.get('/roles')
            roles.value = response.data
            console.log(roles.value)
        }catch(error){
            console.error(error)
        }
    })


    const handleSubmit = async() =>{
        loading.value = true
        try{
            const response = await api.post(`/users/role/assign/${userId.value}`,  {
            role: role.value,
        })
            router.push('/users')
        }catch(error){
            console.log(error)
        }finally{
            loading.value = false
        }
    }



</script>