<template>
<v-select
  label="Select Role"
  :items="roles"
  item-title="name"
  item-value="id"
></v-select>
</template>

<script setup>
    import { useAuthStore } from '@/stores/auth';
    import { useRoute} from 'vue-router';
    import api from '@/api/axios';

    import { ref, onMounted } from 'vue';

    const route = useRoute();

    const userId = ref([route.params.id])

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



</script>