<template>
  <v-card
    :disabled="loading"
    :loading="loading"
    class="mx-auto my-12"
    max-width="800"
    justify="center" align="center"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <div class="mt-3">
        <v-avatar size="100" class="mx-auto mb-4">
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg" alt="User avatar" />
        </v-avatar>
    </div>
    <v-card-item>
      <v-card-title>{{ user?.name}}</v-card-title>

    </v-card-item>

    
    <v-card-item>
        <!-- Menu -->
        <v-tabs
         v-model="tab"
      align-tabs="center"
      color="orange-darken-4"
    >
      <v-tab value="1">Trips</v-tab>
      <v-tab value="2">Favourites</v-tab>
      <v-tab value="3">Reviews</v-tab>
      <v-tab value="4">Photos</v-tab>
    </v-tabs>

    
    </v-card-item>
    <!-- Tab content -->

    <v-card-item>
      <v-tabs-window  v-model="tab">
            <v-tabs-window-item value="1">
                <TripsPage/>
            </v-tabs-window-item>
        </v-tabs-window>

        <v-tabs-window  v-model="tab">
            <v-tabs-window-item value="2">
                <FavouritesPage />
            </v-tabs-window-item>
        </v-tabs-window>

        <v-tabs-window  v-model="tab">
            <v-tabs-window-item value="3">
                <Reviews />
            </v-tabs-window-item>
        </v-tabs-window>
    </v-card-item>
    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>Post a picture, share the experience</v-card-title>

      <v-card-item>
       <!-- <v-btn icon>
        <v-icon class="size-x-large" color="orange-accent-4">mdi-camera</v-icon>
      </v-btn> -->

      <v-file-input
      v-model="image"
      label="Select Image"
      accept="image/*"
      prepend-icon="mdi-camera"
      show-size
    ></v-file-input>
      </v-card-item>

    <v-card-actions>
      <v-btn
        color="deep-purple-lighten-2"
        text="Reserve"
        block
        border
        @click="reserve"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import FavouritesPage from './FavouritesPage.vue';
  import Reviews from '@/components/Reviews.vue';
  import TripsPage from './TripsPage.vue';

  const authStore = useAuthStore();

  const user = authStore.user
  const tab = ref('2')

  //console.log(user?.name)

  const loading = ref(false)
  const selection = ref(1)
  function reserve () {
    loading.value = true
    setTimeout(() => (loading.value = false), 2000)
  }
</script>
  